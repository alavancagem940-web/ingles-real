import { describe, expect, it } from 'vitest'
import {
  BAND_LABEL,
  PLACEMENT_QUESTIONS,
  PLACEMENT_ROUND_SIZE,
  bandFromProgress,
  drawPlacementRound,
  nextPlacementDifficulty,
  placementPassMark,
  questionsForRound,
} from './placement'

describe('teste de nivelamento', () => {
  it('tem um banco maior que a rodada, para a prova mudar', () => {
    expect(questionsForRound('easy').length).toBeGreaterThan(PLACEMENT_ROUND_SIZE)
    expect(questionsForRound('medium').length).toBeGreaterThan(PLACEMENT_ROUND_SIZE)
    expect(questionsForRound('hard').length).toBeGreaterThan(PLACEMENT_ROUND_SIZE)
    expect(PLACEMENT_QUESTIONS.every((item) => item.nativePhrase.trim().length > 2)).toBe(true)
    expect(placementPassMark(5)).toBe(4)
  })

  it('sorteia cinco perguntas e outra chamada pode trazer outras', () => {
    const first = drawPlacementRound('easy', () => 0)
    const second = drawPlacementRound('easy', () => 0.999)
    expect(first).toHaveLength(PLACEMENT_ROUND_SIZE)
    expect(second).toHaveLength(PLACEMENT_ROUND_SIZE)
    expect(first.every((item) => item.difficulty === 'easy')).toBe(true)
    expect(first.map((item) => item.id).join()).not.toBe(second.map((item) => item.id).join())
  })

  it('sobe de bloco só com a maioria forte; senão fecha o teste', () => {
    expect(nextPlacementDifficulty('easy', 4)).toBe('medium')
    expect(nextPlacementDifficulty('easy', 3)).toBe('done')
    expect(nextPlacementDifficulty('easy', 1)).toBe('done')
    expect(nextPlacementDifficulty('medium', 4)).toBe('hard')
    expect(nextPlacementDifficulty('hard', 4)).toBe('done')
  })

  it('mapeia Iniciante / Intermediário / Avançado', () => {
    expect(bandFromProgress('easy', 1)).toBe('iniciante')
    expect(bandFromProgress('medium', 3)).toBe('iniciante')
    expect(bandFromProgress('medium', 4)).toBe('intermediario')
    expect(bandFromProgress('hard', 3)).toBe('intermediario')
    expect(bandFromProgress('hard', 4)).toBe('avancado')
    expect(BAND_LABEL.avancado).toBe('Avançado')
  })
})
