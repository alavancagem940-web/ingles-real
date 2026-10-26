import { describe, expect, it } from 'vitest'
import { shuffledChoices } from './shuffle'

describe('embaralhamento', () => {
  it('não deixa a resposta original sempre na primeira posição', () => {
    const choices = ['certa', 'b', 'c', 'd']
    const seen = new Set<string>()
    for (let i = 0; i < 30; i += 1) {
      const shuffled = shuffledChoices(choices)
      expect(shuffled).toHaveLength(4)
      expect(new Set(shuffled)).toEqual(new Set(choices))
      seen.add(shuffled[0]!)
    }
    expect(seen.size).toBeGreaterThan(1)
  })

  it('respeita o gerador injetado', () => {
    const choices = ['a', 'b', 'c']
    let n = 0
    const random = () => {
      n += 1
      return n % 2 === 0 ? 0 : 0.999
    }
    const once = shuffledChoices(choices, random)
    expect(once).toEqual(expect.arrayContaining(choices))
    expect(once).not.toEqual(choices)
  })
})
