import { LEVELS, getLevel, type Level, type Unit } from './lessons'
import { bandRank, levelUnlockRank, type PlacementBand } from './lesson-core'

export const XP_PER_CORRECT = 10
export const STORAGE_KEY = 'ingles-real-progress-v1'

export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem?(key: string): void
}

export type LessonPhase = 'theory' | 'quiz'

export type SavedAnswer = {
  value: string | string[]
  correct: boolean
}

export type LessonPosition = {
  unitId: string
  phase: LessonPhase
  index: number
  correctCount: number
}

export type PlacementRecord = {
  band: PlacementBand
  at: string
}

export type ProgressSnapshot = {
  xp: number
  completedUnits: string[]
  passedChallenges: string[]
  placementCompleted: boolean
  placementBand: PlacementBand | null
  answers: Record<string, SavedAnswer>
  position: LessonPosition | null
  seenTerms: string[]
  placementHistory: PlacementRecord[]
}

export class ProgressError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProgressError'
  }
}

const emptySnapshot = (): ProgressSnapshot => ({
  xp: 0,
  completedUnits: [],
  passedChallenges: [],
  placementCompleted: false,
  placementBand: null,
  answers: {},
  position: null,
  seenTerms: [],
  placementHistory: [],
})

function memoryStorage(): StorageLike {
  const data = new Map<string, string>()
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value)
    },
    removeItem: (key) => {
      data.delete(key)
    },
  }
}

export function defaultStorage(): StorageLike {
  try {
    if (typeof localStorage === 'undefined') return memoryStorage()
    const probe = '__ingles_real_probe__'
    localStorage.setItem(probe, '1')
    localStorage.removeItem(probe)
    return localStorage
  } catch {
    return memoryStorage()
  }
}

export class ProgressStore {
  xp = 0
  completedUnits: string[] = []
  passedChallenges: string[] = []
  placementCompleted = false
  placementBand: PlacementBand | null = null
  answers: Record<string, SavedAnswer> = {}
  position: LessonPosition | null = null
  seenTerms: string[] = []
  placementHistory: PlacementRecord[] = []
  private storage: StorageLike
  private key: string

  constructor(storage: StorageLike = defaultStorage(), key = STORAGE_KEY) {
    this.storage = storage
    this.key = key
  }

  load(): void {
    const raw = this.storage.getItem(this.key)
    if (!raw) {
      this.save()
      return
    }
    try {
      const data = JSON.parse(raw) as Record<string, unknown>
      this.xp = Number(data.xp ?? 0) || 0
      this.completedUnits = Array.isArray(data.completedUnits)
        ? data.completedUnits.map(String)
        : Array.isArray(data.completed_units)
          ? data.completed_units.map(String)
          : []
      this.passedChallenges = Array.isArray(data.passedChallenges)
        ? data.passedChallenges.map(String)
        : Array.isArray(data.passed_challenges)
          ? data.passed_challenges.map(String)
          : []
      this.placementCompleted = Boolean(data.placementCompleted)
      this.placementBand = parseBand(data.placementBand)
      this.answers = parseAnswers(data.answers)
      this.position = parsePosition(data.position)
      this.seenTerms = Array.isArray(data.seenTerms) ? data.seenTerms.map(String) : []
      this.placementHistory = parsePlacementHistory(data.placementHistory)
    } catch (error) {
      throw new ProgressError(
        `Não foi possível ler o progresso salvo: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  save(): void {
    const payload: ProgressSnapshot = this.snapshot()
    try {
      this.storage.setItem(this.key, JSON.stringify(payload))
    } catch (error) {
      throw new ProgressError(
        `Não foi possível salvar o progresso neste navegador: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  reset(): void {
    const empty = emptySnapshot()
    this.xp = empty.xp
    this.completedUnits = []
    this.passedChallenges = []
    this.placementCompleted = false
    this.placementBand = null
    this.answers = {}
    this.position = null
    this.seenTerms = []
    this.placementHistory = []
    this.save()
  }

  snapshot(): ProgressSnapshot {
    return {
      xp: this.xp,
      completedUnits: [...this.completedUnits],
      passedChallenges: [...this.passedChallenges],
      placementCompleted: this.placementCompleted,
      placementBand: this.placementBand,
      answers: { ...this.answers },
      position: this.position ? { ...this.position } : null,
      seenTerms: [...this.seenTerms],
      placementHistory: this.placementHistory.map((row) => ({ ...row })),
    }
  }

  addXp(amount: number): void {
    this.xp += Math.max(0, amount)
    this.save()
  }

  completePlacement(band: PlacementBand): void {
    this.rememberPlacement(band)
  }

  retakePlacement(band: PlacementBand): void {
    this.rememberPlacement(band)
  }

  noteTerm(id: string): void {
    if (!id || this.seenTerms.includes(id)) return
    this.seenTerms.push(id)
    this.save()
  }

  private rememberPlacement(band: PlacementBand): void {
    this.placementCompleted = true
    this.placementBand = band
    this.placementHistory.push({ band, at: new Date().toISOString() })
    this.save()
  }

  recordAnswer(exerciseId: string, value: string | string[], correct: boolean): void {
    this.answers[exerciseId] = { value, correct }
    this.save()
  }

  savePosition(position: LessonPosition | null): void {
    this.position = position
    this.save()
  }

  markUnitComplete(unitId: string, bonusXp: number): void {
    const firstTime = !this.completedUnits.includes(unitId)
    if (firstTime) this.completedUnits.push(unitId)
    if (this.position?.unitId === unitId) this.position = null
    this.addXp(firstTime ? bonusXp : 0)
  }

  markChallengePassed(levelId: string, unitId: string, bonusXp: number): void {
    if (!this.completedUnits.includes(unitId)) this.completedUnits.push(unitId)
    const firstTime = !this.passedChallenges.includes(levelId)
    if (firstTime) this.passedChallenges.push(levelId)
    if (this.position?.unitId === unitId) this.position = null
    this.addXp(firstTime ? bonusXp : 0)
  }

  isLevelUnlocked(levelId: string): boolean {
    if (!this.placementCompleted) return false
    const rank = levelUnlockRank(levelId)
    if (rank >= 3) {
      return this.passedChallenges.includes('avancado')
    }
    const floor = this.placementBand ? bandRank(this.placementBand) : 0
    if (rank <= floor) return true
    const ids = LEVELS.map((level) => level.id)
    const index = ids.indexOf(levelId)
    if (index <= 0) return true
    const previous = ids[index - 1]
    return previous !== undefined && this.passedChallenges.includes(previous)
  }

  isUnitUnlocked(levelId: string, unitId: string): boolean {
    if (!this.isLevelUnlocked(levelId)) return false
    const level = getLevel(levelId)
    if (!level) return false
    const previousIds: string[] = []
    for (const unit of level.units) {
      if (unit.id === unitId) {
        return previousIds.every((id) => this.completedUnits.includes(id))
      }
      previousIds.push(unit.id)
    }
    return false
  }

  isUnitComplete(unitId: string): boolean {
    return this.completedUnits.includes(unitId)
  }

  needsPlacement(): boolean {
    return !this.placementCompleted
  }

  currentUnit(): { level: Level; unit: Unit } | null {
    const startRank = this.placementBand ? bandRank(this.placementBand) : 0
    const ordered = [...LEVELS].sort((left, right) => {
      const leftRank = levelUnlockRank(left.id)
      const rightRank = levelUnlockRank(right.id)
      const leftPref = leftRank >= startRank ? 0 : 1
      const rightPref = rightRank >= startRank ? 0 : 1
      if (leftPref !== rightPref) return leftPref - rightPref
      return leftRank - rightRank
    })
    for (const level of ordered) {
      for (const unit of level.units) {
        if (this.isUnitUnlocked(level.id, unit.id) && !this.completedUnits.includes(unit.id)) {
          return { level, unit }
        }
      }
    }
    return null
  }
}

function parseBand(value: unknown): PlacementBand | null {
  if (value === 'iniciante' || value === 'intermediario' || value === 'avancado') return value
  return null
}

function parsePlacementHistory(value: unknown): PlacementRecord[] {
  if (!Array.isArray(value)) return []
  const rows: PlacementRecord[] = []
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const row = entry as Record<string, unknown>
    const band = parseBand(row.band)
    if (!band) continue
    rows.push({ band, at: String(row.at ?? '') })
  }
  return rows
}

function parseAnswers(value: unknown): Record<string, SavedAnswer> {
  if (!value || typeof value !== 'object') return {}
  const out: Record<string, SavedAnswer> = {}
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!entry || typeof entry !== 'object') continue
    const row = entry as Record<string, unknown>
    const raw = row.value
    const savedValue = Array.isArray(raw) ? raw.map(String) : String(raw ?? '')
    out[key] = { value: savedValue, correct: Boolean(row.correct) }
  }
  return out
}

function parsePosition(value: unknown): LessonPosition | null {
  if (!value || typeof value !== 'object') return null
  const row = value as Record<string, unknown>
  const unitId = String(row.unitId ?? '')
  const phase = row.phase === 'quiz' ? 'quiz' : row.phase === 'theory' ? 'theory' : null
  if (!unitId || !phase) return null
  return {
    unitId,
    phase,
    index: Math.max(0, Number(row.index ?? 0) || 0),
    correctCount: Math.max(0, Number(row.correctCount ?? 0) || 0),
  }
}

export function createMemoryStorage(initial?: Record<string, string>): StorageLike {
  const data = new Map<string, string>(Object.entries(initial ?? {}))
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value)
    },
    removeItem: (key) => {
      data.delete(key)
    },
  }
}
