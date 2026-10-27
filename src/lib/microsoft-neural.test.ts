import { describe, expect, it } from 'vitest'
import { LEVELS, spokenTheory } from './lessons'
import { toSpokenText } from './speech-persona'
import {
  DEFAULT_VOICE_ID,
  DEFAULT_VOICE_WHY,
  EXPLAIN_VOICE_ID,
  FALLBACK_VOICE_ID,
  NEURAL_VOICES,
  SSML_PITCH,
  SSML_RATE,
  TTS_LANG,
  TTS_PITCH,
  TTS_RATE,
  buildSsml,
  collectSpokenLines,
  isMpegBuffer,
  isNeuralVoiceId,
  ttsAssetHash,
  ttsCacheFingerprint,
  voiceById,
} from './microsoft-neural'

describe('voz neural Microsoft en-US', () => {
  it('escolhe Jenny como padrão, Ana como fallback, nunca Francisca', () => {
    expect(DEFAULT_VOICE_ID).toBe('en-US-JennyNeural')
    expect(FALLBACK_VOICE_ID).toBe('en-US-AnaNeural')
    expect(NEURAL_VOICES.map((voice) => voice.id)).toEqual(['en-US-JennyNeural', 'en-US-AnaNeural'])
    expect(TTS_LANG).toBe('en-US')
    expect(isNeuralVoiceId('pt-BR-FranciscaNeural')).toBe(false)
    expect(isNeuralVoiceId('en-US-JennyNeural')).toBe(true)
    expect(voiceById('pt-BR-FranciscaNeural').id).toBe('en-US-JennyNeural')
    expect(DEFAULT_VOICE_WHY.toLowerCase()).toMatch(/jenny/)
    expect(DEFAULT_VOICE_WHY.toLowerCase()).not.toMatch(/francisca/)
  })

  it('usa rate lenta e pitch suave, não o padrão rápido', () => {
    expect(TTS_RATE).toBe(0.85)
    expect(TTS_PITCH).toBe(0.92)
    expect(SSML_RATE).toBe('-10%')
    expect(SSML_PITCH).toBe('-5Hz')
    const ssml = buildSsml("I'm gonna call you later. Wanna hang out?", 'en-US-JennyNeural')
    expect(ssml).toContain('name="en-US-JennyNeural"')
    expect(ssml).toContain('xml:lang="en-US"')
    expect(ssml).toContain('rate="-10%"')
    expect(ssml).toContain('pitch="-5Hz"')
    expect(ssml).toContain('break time="380ms"')
    expect(ssml).not.toContain('rate="+0%"')
    expect(ssml).not.toContain('pitch="+0Hz"')
    expect(ssml).toContain("I'm gonna call you later.")
  })

  it('a explicação inteira fica com a Francisca, sem cortar no meio para a Jenny', () => {
    const ssml = buildSsml(
      "Hey, what's up? é um oi informal entre amigos nos EUA.",
      EXPLAIN_VOICE_ID,
    )
    expect(ssml).toContain('name="pt-BR-FranciscaNeural"')
    expect(ssml).not.toContain('en-US-JennyNeural')
    expect(ssml).toContain('break time="560ms"')
    expect(ssml.match(/<voice /g)).toHaveLength(1)
    const choice = buildSsml('Oi, e aí?', EXPLAIN_VOICE_ID)
    expect(choice).toContain('name="pt-BR-FranciscaNeural"')
    expect(choice).not.toContain('en-US-JennyNeural')
    const lines = collectSpokenLines()
    expect(lines.some((line) => line.kind === 'explain' && line.spoken.includes('oi informal'))).toBe(true)
    expect(lines.some((line) => line.kind === 'explain' && line.spoken.includes('partícula'))).toBe(true)
    expect(ttsCacheFingerprint(EXPLAIN_VOICE_ID, 'oi').startsWith('v3|francisca|')).toBe(true)
  })

  it('coleta o inglês visível, sem reescrever o currículo em português', () => {
    const lines = collectSpokenLines()
    expect(lines.length).toBeGreaterThan(40)
    expect(lines.some((line) => line.kind === 'native')).toBe(true)
    const first = LEVELS[0]?.units[0]
    expect(first).toBeTruthy()
    if (!first) return
    expect(lines.some((line) => line.spoken === toSpokenText(spokenTheory(first)))).toBe(true)
    expect(lines.some((line) => line.spoken.includes("I'm gonna call you later."))).toBe(true)
  })

  it('gera hash estável incluindo rate e pitch', async () => {
    const a = ttsAssetHash('en-US-JennyNeural', "I'm gonna go")
    const b = ttsAssetHash('en-US-JennyNeural', "I'm gonna go")
    const c = ttsAssetHash('en-US-AnaNeural', "I'm gonna go")
    expect(a).toBe(b)
    expect(a).not.toBe(c)
    expect(a).toMatch(/^[a-f0-9]{64}$/)
    expect(ttsCacheFingerprint('en-US-JennyNeural', 'oi')).toContain('-5Hz')
    expect(ttsCacheFingerprint('en-US-JennyNeural', 'oi')).toContain('-10%')
    const { sha256Hex, sha256HexSync } = await import('./microsoft-neural')
    expect(sha256HexSync('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    expect(await sha256Hex('oi')).toBe(sha256HexSync('oi'))
  })

  it('reconhece cabeçalho MPEG', () => {
    expect(isMpegBuffer(new Uint8Array([0xff, 0xf3, 0x48, 0xc4]))).toBe(true)
    expect(isMpegBuffer(new Uint8Array([0x49, 0x44, 0x33, 0x04]))).toBe(true)
    expect(isMpegBuffer(new Uint8Array([0x00, 0x01]))).toBe(false)
  })
})
