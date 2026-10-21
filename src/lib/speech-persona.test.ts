import { describe, expect, it } from 'vitest'
import { LEVELS } from './lessons'
import { collectSpokenLines } from './microsoft-neural'
import { NATIVE_LISTEN_LABEL, toSpokenText } from './speech-persona'

const FLIRTY =
  /chega mais perto|relaxa o corpo|mmm\.{2,}|no seu ouvido|me provoca|sem vergonha|fico colada|sente o calor|gostei de você escolhendo|eu espero, quente|sss\.{2,}|tesão|baixinho|sexy|moan/i

describe('texto falado', () => {
  it('o botão visível tem o rótulo exato', () => {
    expect(NATIVE_LISTEN_LABEL).toBe('Ouvir Pronúncia Nativa')
  })

  it('fala o inglês da lição, sem persona flertante', () => {
    const prompt = "I'm gonna call you later."
    expect(toSpokenText(prompt)).toBe(prompt)
    expect(toSpokenText(`  ${prompt}  `)).toBe(prompt)
    expect(toSpokenText(prompt)).not.toMatch(FLIRTY)
  })

  it('nenhuma fala empacotada leva tesão, flerte ou provocação', () => {
    const lines = collectSpokenLines()
    expect(lines.length).toBeGreaterThan(40)
    for (const line of lines) {
      expect(line.spoken, line.source).not.toMatch(FLIRTY)
      expect(line.spoken).toBe(toSpokenText(line.source))
    }
  })

  it('não altera o texto visível do currículo', () => {
    const first = LEVELS[0]?.units[0]
    expect(first?.theory.concept.toLowerCase()).not.toMatch(FLIRTY)
    expect(first?.exercises[0]?.nativePhrase.toLowerCase()).not.toMatch(FLIRTY)
  })
})
