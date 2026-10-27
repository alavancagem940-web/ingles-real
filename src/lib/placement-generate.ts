import {
  PLACEMENT_BANK,
  explainCorrect,
  explainWrong,
  type PlacementSeed,
} from './placement-bank'
import type { PlacementBand, PlacementDifficulty, PlacementQuestion } from './placement'

export const PLACEMENT_PER_LEVEL = 10
export const PLACEMENT_COUNT = PLACEMENT_PER_LEVEL * 3
/** The screen stays up long enough to show that this sitting is being built. */
export const PLACEMENT_PREP_MS = 2200
const LEVEL_PASS = 0.7

const MEANING_PROMPTS = [
  (english: string) => `O que “${english}” quer dizer na conversa dos EUA?`,
  (english: string) => `Na fala do dia a dia, “${english}” comunica o quê?`,
  (english: string) => `Qual é o sentido de “${english}” quando um americano fala isso?`,
]

const FORM_PROMPTS = [
  (meaning: string) => `Como um americano falaria “${meaning}”?`,
  (meaning: string) => `Qual frase soa natural para “${meaning}”?`,
  (meaning: string) => `O que se ouve nos EUA no lugar de “${meaning}”?`,
]

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const pool = [...items]
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = pool[index]!
    pool[index] = pool[swap]!
    pool[swap] = current
  }
  return pool
}

function pick<T>(items: readonly T[], random: () => number): T {
  return items[Math.floor(random() * items.length)]!
}

function distractors(seed: PlacementSeed, form: 'meaning' | 'form', random: () => number): string[] {
  const answer = form === 'meaning' ? seed.meaning : seed.english
  const authored = form === 'meaning' ? [...seed.wrongMeanings] : [...seed.wrongEnglish]
  const pool = PLACEMENT_BANK.filter((item) => item.difficulty === seed.difficulty && item.key !== seed.key).map(
    (item) => (form === 'meaning' ? item.meaning : item.english),
  )
  const chosen = shuffle(authored, random)
  if (random() < 0.65) {
    const extra = shuffle(pool, random).find((phrase) => phrase !== answer && !chosen.slice(0, -1).includes(phrase))
    if (extra) chosen[chosen.length - 1] = extra
  }
  const unique: string[] = []
  for (const phrase of [...chosen, ...authored, ...pool]) {
    if (unique.length >= 3) break
    if (phrase !== answer && !unique.includes(phrase)) unique.push(phrase)
  }
  if (unique.length < 3) throw new Error(`Faltam distratores em ${seed.key}.`)
  return unique
}

function buildQuestion(seed: PlacementSeed, random: () => number): PlacementQuestion {
  const form = random() < 0.5 ? 'meaning' : 'form'
  const options = distractors(seed, form, random)
  const answer = form === 'meaning' ? seed.meaning : seed.english
  const prompt =
    form === 'meaning' ? pick(MEANING_PROMPTS, random)(seed.english) : pick(FORM_PROMPTS, random)(seed.meaning)
  return {
    id: `${seed.key}:${form}`,
    difficulty: seed.difficulty,
    prompt,
    nativePhrase: seed.english,
    choicesAreEnglish: form === 'form',
    choices: shuffle([answer, ...options.slice(0, 3)], random),
    answer,
    explainCorrect: explainCorrect(seed),
    explainWrong: explainWrong(seed),
  }
}

/** A new call is a new test. Nothing here is stored for the next fresh opening. */
export function generatePlacement(random: () => number = Math.random): PlacementQuestion[] {
  const byLevel: Record<PlacementDifficulty, PlacementSeed[]> = { easy: [], medium: [], hard: [] }
  for (const seed of PLACEMENT_BANK) byLevel[seed.difficulty].push(seed)
  const picked: PlacementSeed[] = []
  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    picked.push(...shuffle(byLevel[difficulty], random).slice(0, PLACEMENT_PER_LEVEL))
  }
  return shuffle(
    picked.map((seed) => buildQuestion(seed, random)),
    random,
  )
}

function ratio(questions: readonly PlacementQuestion[], correct: readonly boolean[], difficulty: PlacementDifficulty): number {
  let total = 0
  let hits = 0
  questions.forEach((question, index) => {
    if (question.difficulty !== difficulty) return
    total += 1
    if (correct[index]) hits += 1
  })
  return total === 0 ? 0 : hits / total
}

/** Advanced only if the hard block is solid too. Easy luck does not skip the path. */
export function bandFromAnswers(questions: readonly PlacementQuestion[], correct: readonly boolean[]): PlacementBand {
  const easy = ratio(questions, correct, 'easy') >= LEVEL_PASS
  const medium = ratio(questions, correct, 'medium') >= LEVEL_PASS
  const hard = ratio(questions, correct, 'hard') >= LEVEL_PASS
  if (easy && medium && hard) return 'avancado'
  if (easy && medium) return 'intermediario'
  return 'iniciante'
}
