import { describe, expect, it } from 'vitest'
import { PLACEMENT_BANK } from './placement-bank'
import { bandFromAnswers, generatePlacement, mulberry32, PLACEMENT_COUNT, PLACEMENT_PER_LEVEL } from './placement-generate'

describe('avaliação gerada na hora', () => {
  it('monta 30 perguntas, dez de cada nível, com a resposta entre as opções', () => {
    const quiz = generatePlacement(mulberry32(7))
    expect(quiz).toHaveLength(PLACEMENT_COUNT)
    expect(quiz.filter((item) => item.difficulty === 'easy')).toHaveLength(PLACEMENT_PER_LEVEL)
    expect(quiz.filter((item) => item.difficulty === 'medium')).toHaveLength(PLACEMENT_PER_LEVEL)
    expect(quiz.filter((item) => item.difficulty === 'hard')).toHaveLength(PLACEMENT_PER_LEVEL)
    expect(new Set(quiz.map((item) => item.id)).size).toBe(quiz.length)
    for (const question of quiz) {
      expect(question.choices).toHaveLength(4)
      expect(new Set(question.choices).size).toBe(4)
      expect(question.choices).toContain(question.answer)
      expect(question.nativePhrase.trim().length).toBeGreaterThan(2)
      expect(question.explainCorrect.length).toBeGreaterThan(40)
    }
  })

  it('a mesma semente repete a prova; outra semente traz outro conjunto', () => {
    const first = generatePlacement(mulberry32(11)).map((item) => `${item.id}|${item.choices.join('~')}`)
    const again = generatePlacement(mulberry32(11)).map((item) => `${item.id}|${item.choices.join('~')}`)
    const other = generatePlacement(mulberry32(99)).map((item) => `${item.id}|${item.choices.join('~')}`)
    expect(again).toEqual(first)
    expect(other.join('\n')).not.toBe(first.join('\n'))
    const firstIds = new Set(generatePlacement(mulberry32(11)).map((item) => item.id))
    const otherIds = new Set(generatePlacement(mulberry32(99)).map((item) => item.id))
    const shared = [...firstIds].filter((id) => otherIds.has(id))
    expect(shared.length).toBeLessThan(PLACEMENT_COUNT)
  })

  it('só marca Avançado quando o bloco difícil também fecha', () => {
    const quiz = generatePlacement(mulberry32(3))
    const all = quiz.map(() => true)
    const easyMid = quiz.map((item) => item.difficulty !== 'hard')
    const easyOnly = quiz.map((item) => item.difficulty === 'easy')
    expect(bandFromAnswers(quiz, all)).toBe('avancado')
    expect(bandFromAnswers(quiz, easyMid)).toBe('intermediario')
    expect(bandFromAnswers(quiz, easyOnly)).toBe('iniciante')
    expect(bandFromAnswers(quiz, quiz.map(() => false))).toBe('iniciante')
  })

  it('o banco tem folga para a próxima prova não repetir a anterior', () => {
    const keys = PLACEMENT_BANK.map((item) => item.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const difficulty of ['easy', 'medium', 'hard'] as const) {
      const seeds = PLACEMENT_BANK.filter((item) => item.difficulty === difficulty)
      expect(seeds.length).toBeGreaterThan(PLACEMENT_PER_LEVEL)
      expect(new Set(seeds.map((item) => item.meaning)).size).toBe(seeds.length)
      expect(new Set(seeds.map((item) => item.english)).size).toBe(seeds.length)
      for (const seed of seeds) {
        expect(seed.wrongMeanings).not.toContain(seed.meaning)
        expect(seed.wrongEnglish).not.toContain(seed.english)
      }
    }
  })
})
