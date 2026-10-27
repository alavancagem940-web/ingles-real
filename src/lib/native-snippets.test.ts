import { describe, expect, it } from 'vitest'
import { nativePhrasesIn } from './native-snippets'

describe('frases nativas depois da explicação', () => {
  it('separa a frase em inglês e deixa o resto para a leitura em português', () => {
    const phrases = nativePhrasesIn("Hey, what's up? é um oi informal entre amigos nos EUA.")
    expect(phrases.some((phrase) => phrase.toLowerCase().includes("what's up"))).toBe(true)
    expect(phrases.join(' ').toLowerCase()).not.toContain('informal')
  })

  it('não inventa inglês numa alternativa só em português', () => {
    expect(nativePhrasesIn('Oi, e aí?')).toEqual([])
  })

  it('mostra as partículas do balão, cada uma inteira', () => {
    const phrases = nativePhrasesIn('É um verbo colado numa partícula, como out, up ou into.')
    expect(phrases.map((phrase) => phrase.toLowerCase())).toEqual(['out', 'up', 'into'])
  })

  it('coloca a frase da pergunta antes dos trechos achados no texto', () => {
    const phrases = nativePhrasesIn('Na fala isso vira gonna.', ['See ya.'])
    expect(phrases[0]).toBe('See ya.')
    expect(phrases).toContain('gonna')
  })
})