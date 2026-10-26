import { describe, expect, it } from 'vitest'
import { firstUnseenTerm } from './glossary'

describe('glossário', () => {
  it('explica phrasal verb na primeira vez e não repete', () => {
    const term = firstUnseenTerm('Qual frase usa o phrasal verb de encontrar?', [])
    expect(term?.id).toBe('phrasal-verb')
    expect(term?.body.toLowerCase()).toContain('preposição')
    expect(firstUnseenTerm('outro phrasal verb', ['phrasal-verb'])).toBeNull()
  })

  it('explica idiom para quem nunca viu o termo', () => {
    const term = firstUnseenTerm('O que o idiom quer dizer?', [])
    expect(term?.id).toBe('idiom')
  })
})
