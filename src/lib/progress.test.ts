import { describe, expect, it } from 'vitest'
import { LEVELS } from './lessons'
import { STORAGE_KEY, ProgressStore, createMemoryStorage } from './progress'

describe('progresso localStorage', () => {
  it('na primeira abertura ainda não destrava a trilha', () => {
    const store = new ProgressStore(createMemoryStorage())
    store.load()
    expect(store.needsPlacement()).toBe(true)
    expect(store.isLevelUnlocked('basico')).toBe(false)
    expect(store.snapshot()).not.toHaveProperty('hearts')
  })

  it('Iniciante abre o Básico; Intermediário começa no Intermediário', () => {
    const store = new ProgressStore(createMemoryStorage())
    store.load()
    store.completePlacement('iniciante')
    expect(store.isLevelUnlocked('basico')).toBe(true)
    expect(store.isLevelUnlocked('intermediario')).toBe(false)
    store.retakePlacement('intermediario')
    expect(store.xp).toBe(0)
    expect(store.isLevelUnlocked('basico')).toBe(false)
    expect(store.isLevelUnlocked('intermediario')).toBe(true)
    expect(store.isLevelUnlocked('avancado')).toBe(false)
  })

  it('Avançado começa no Avançado; Fluência espera o desafio', () => {
    const store = new ProgressStore(createMemoryStorage())
    store.load()
    store.completePlacement('avancado')
    expect(store.isLevelUnlocked('basico')).toBe(false)
    expect(store.isLevelUnlocked('intermediario')).toBe(false)
    expect(store.isLevelUnlocked('avancado')).toBe(true)
    expect(store.isLevelUnlocked('fluencia')).toBe(false)
    store.markChallengePassed('avancado', 'a4_avancado_desafio', 100)
    expect(store.isLevelUnlocked('basico')).toBe(false)
    expect(store.isLevelUnlocked('fluencia')).toBe(true)
  })

  it('refazer o teste não apaga XP nem módulos', () => {
    const storage = createMemoryStorage()
    const store = new ProgressStore(storage)
    store.load()
    store.completePlacement('iniciante')
    store.addXp(40)
    store.markUnitComplete('b1_gonna_wanna', 40)
    store.recordAnswer('b1_q1', 'Eu vou me atrasar.', true)
    store.savePosition({ unitId: 'b2_whatcha', phase: 'quiz', index: 2, correctCount: 1 })
    store.retakePlacement('avancado')
    expect(store.xp).toBe(80)
    expect(store.completedUnits).toContain('b1_gonna_wanna')
    expect(store.answers.b1_q1?.correct).toBe(true)
    expect(store.position?.index).toBe(2)
    const payload = JSON.parse(storage.getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>
    expect(payload.xp).toBe(80)
    expect(payload.placementBand).toBe('avancado')
    expect(Array.isArray(payload.placementHistory)).toBe(true)
    expect((payload.placementHistory as unknown[]).length).toBeGreaterThan(0)
    expect(payload).toHaveProperty('seenTerms')
    expect(payload).toHaveProperty('answers')
    expect(payload).toHaveProperty('position')
    expect(payload).not.toHaveProperty('hearts')
  })

  it('reabrir continua da posição salva', () => {
    const storage = createMemoryStorage()
    const first = new ProgressStore(storage)
    first.load()
    first.completePlacement('iniciante')
    first.savePosition({ unitId: 'b1_gonna_wanna', phase: 'quiz', index: 3, correctCount: 2 })
    const second = new ProgressStore(storage)
    second.load()
    expect(second.position).toEqual({
      unitId: 'b1_gonna_wanna',
      phase: 'quiz',
      index: 3,
      correctCount: 2,
    })
    expect(second.placementBand).toBe('iniciante')
  })

  it('a primeira lição aberta é a do patamar, e o caminho segue para cima', () => {
    const store = new ProgressStore(createMemoryStorage())
    store.load()
    store.completePlacement('intermediario')
    expect(store.currentUnit()?.unit.id).toBe('i1_gotta_shoulda')
    store.retakePlacement('avancado')
    expect(store.currentUnit()?.unit.id).toBe('a1_idioms')
    store.retakePlacement('iniciante')
    expect(store.currentUnit()?.unit.id).toBe('b1_gonna_wanna')
  })

  it('libera a próxima lição ao concluir a anterior', () => {
    const store = new ProgressStore(createMemoryStorage())
    store.load()
    store.completePlacement('iniciante')
    const n1 = LEVELS[0]!
    const first = n1.units[0]!
    const second = n1.units[1]!
    expect(store.isUnitUnlocked(n1.id, second.id)).toBe(false)
    store.markUnitComplete(first.id, 20)
    expect(store.isUnitUnlocked(n1.id, second.id)).toBe(true)
  })
})
