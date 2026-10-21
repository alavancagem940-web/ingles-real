import { describe, expect, it } from 'vitest'
import {
  BAND_LABEL,
  PLACEMENT_PASS,
  PLACEMENT_QUESTIONS,
  bandFromProgress,
  nextPlacementDifficulty,
  questionsForRound,
} from './placement'

describe('teste de nivelamento', () => {
  it('tem três blocos progressivos com frases em inglês', () => {
    expect(questionsForRound('easy')).toHaveLength(3)
    expect(questionsForRound('medium')).toHaveLength(3)
    expect(questionsForRound('hard')).toHaveLength(3)
    expect(PLACEMENT_QUESTIONS.every((item) => item.nativePhrase.trim().length > 2)).toBe(true)
    expect(PLACEMENT_PASS).toBe(2)
  })

  it('sobe de bloco só com 2 acertos; senão fecha o teste', () => {
    expect(nextPlacementDifficulty('easy', 2)).toBe('medium')
    expect(nextPlacementDifficulty('easy', 1)).toBe('done')
    expect(nextPlacementDifficulty('medium', 2)).toBe('hard')
    expect(nextPlacementDifficulty('hard', 2)).toBe('done')
  })

  it('mapeia Iniciante / Intermediário / Avançado', () => {
    expect(bandFromProgress('easy', 1)).toBe('iniciante')
    expect(bandFromProgress('medium', 1)).toBe('iniciante')
    expect(bandFromProgress('hard', 1)).toBe('intermediario')
    expect(bandFromProgress('hard', 2)).toBe('avancado')
    expect(BAND_LABEL.avancado).toBe('Avançado')
  })
})
