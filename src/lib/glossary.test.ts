import { describe, expect, it } from 'vitest'
import { firstUnseenTerm, glossarySpans } from './glossary'

describe('glossário', () => {
  it('explica phrasal verb na primeira vez e não repete', () => {
    const term = firstUnseenTerm('Qual phrasal verb significa sair com amigos?', [])
    expect(term?.id).toBe('phrasal-verb')
    expect(term?.body.toLowerCase()).toContain('partícula')
    expect(term?.body.toLowerCase()).not.toContain('hang out')
    expect(firstUnseenTerm('outro phrasal verb', ['phrasal-verb'])).toBeNull()
  })

  it('explica idiom sem entregar o sentido da frase da prova', () => {
    const term = firstUnseenTerm('O que o idiom quer dizer?', [])
    expect(term?.id).toBe('idiom')
    expect(term?.body.toLowerCase()).not.toContain('piece of cake')
    expect(term?.body.toLowerCase()).not.toContain('bolo')
  })

  it('marca o termo dentro da pergunta para o balão', () => {
    const spans = glossarySpans('Qual phrasal verb significa “sair com amigos”?')
    expect(spans).toHaveLength(1)
    expect(spans[0]?.term.id).toBe('phrasal-verb')
    expect(spans[0]?.start).toBe('Qual '.length)
    const text = 'Qual phrasal verb significa “sair com amigos”?'
    expect(text.slice(spans[0]!.start, spans[0]!.end)).toBe('phrasal verb')
  })
})
