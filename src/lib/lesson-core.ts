import { NATIVE_LISTEN_LABEL } from './speech-persona'

export { NATIVE_LISTEN_LABEL }
export const THEORY_CARD_TITLE = 'Explicação Teórica Prática'

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'order_phrase'
export type UnitKind = 'lesson' | 'challenge'
export type NormalizeMode = 'text' | 'phrase'

export type TheoryExample = {
  caption: string
  english: string
  translation: string
}

export type Theory = {
  concept: string
  culture: string
  examples: TheoryExample[]
  speak: string
}

export type Exercise = {
  id: string
  type: ExerciseType
  prompt: string
  nativePhrase: string
  phrases: string[]
  choicesAreEnglish: boolean
  explainCorrect: string
  explainWrong: string
  choices: string[]
  answer: string | string[]
  accepted: string[]
  lines: string[]
  normalize: NormalizeMode
}

export type Unit = {
  id: string
  title: string
  subtitle: string
  kind: UnitKind
  xpReward: number
  theory: Theory
  exercises: Exercise[]
}

export type Level = {
  id: string
  order: number
  band: string
  title: string
  description: string
  unlocksAt: PlacementBand
  units: Unit[]
}

export type PlacementBand = 'iniciante' | 'intermediario' | 'avancado'

export type CheckResult = {
  correct: boolean
  message: string
}

export function spokenNative(exercise: Exercise): string {
  return exercise.nativePhrase
}

/** Visible English on the theory card, in card order — what Jenny reads. */
export function spokenTheory(unit: Unit): string {
  const parts: string[] = []
  for (const example of unit.theory.examples) {
    if (example.english.trim()) parts.push(example.english.trim())
  }
  return parts.join(' ')
}

export function englishPhrasesOf(exercise: Exercise): string[] {
  const phrases = [exercise.nativePhrase, ...exercise.phrases]
  if (exercise.choicesAreEnglish) phrases.push(...exercise.choices)
  phrases.push(...exercise.lines)
  return [...new Set(phrases.map((item) => item.trim()).filter(Boolean))]
}

export function theory(spec: Omit<Theory, 'speak'> & { speak?: string }): Theory {
  const examplesSpeak = spec.examples.map((example) => example.english).join(' ')
  return {
    concept: spec.concept,
    culture: spec.culture,
    examples: spec.examples,
    speak: spec.speak ?? examplesSpeak,
  }
}

export function mcPt(
  id: string,
  prompt: string,
  nativePhrase: string,
  choices: readonly string[],
  answer: string,
  explainCorrect: string,
  explainWrong: string,
): Exercise {
  if (!choices.includes(answer)) {
    throw new Error(`Resposta '${answer}' não está nas alternativas de ${id}`)
  }
  return {
    id,
    type: 'multiple_choice',
    prompt,
    nativePhrase,
    phrases: [],
    choicesAreEnglish: false,
    choices: [...choices],
    answer,
    accepted: [],
    lines: [],
    explainCorrect,
    explainWrong,
    normalize: 'text',
  }
}

export function mcEn(
  id: string,
  prompt: string,
  nativePhrase: string,
  choices: readonly string[],
  answer: string,
  explainCorrect: string,
  explainWrong: string,
): Exercise {
  if (!choices.includes(answer)) {
    throw new Error(`Resposta '${answer}' não está nas alternativas de ${id}`)
  }
  return {
    id,
    type: 'multiple_choice',
    prompt,
    nativePhrase,
    phrases: [],
    choicesAreEnglish: true,
    choices: [...choices],
    answer,
    accepted: [],
    lines: [],
    explainCorrect,
    explainWrong,
    normalize: 'phrase',
  }
}

export function fill(
  id: string,
  prompt: string,
  nativePhrase: string,
  accepted: readonly string[],
  explainCorrect: string,
  explainWrong: string,
): Exercise {
  return {
    id,
    type: 'fill_blank',
    prompt,
    nativePhrase,
    phrases: [],
    choicesAreEnglish: false,
    choices: [],
    answer: accepted[0] ?? '',
    accepted: [...accepted],
    lines: [],
    explainCorrect,
    explainWrong,
    normalize: 'phrase',
  }
}

export function order(
  id: string,
  prompt: string,
  nativePhrase: string,
  lines: readonly string[],
  explainCorrect: string,
  explainWrong: string,
): Exercise {
  return {
    id,
    type: 'order_phrase',
    prompt,
    nativePhrase,
    phrases: [...lines],
    choicesAreEnglish: false,
    choices: [],
    answer: [...lines],
    accepted: [],
    lines: [...lines],
    explainCorrect,
    explainWrong,
    normalize: 'phrase',
  }
}

export function lesson(
  id: string,
  title: string,
  subtitle: string,
  xpReward: number,
  theorySpec: Theory,
  exercises: Exercise[],
): Unit {
  return { id, title, subtitle, kind: 'lesson', xpReward, theory: theorySpec, exercises }
}

export function challenge(
  id: string,
  title: string,
  subtitle: string,
  xpReward: number,
  theorySpec: Theory,
  exercises: Exercise[],
): Unit {
  return { id, title, subtitle, kind: 'challenge', xpReward, theory: theorySpec, exercises }
}

function tidyInput(value: string): string {
  return value
    .replace(/[\u200b\u200c\u200d\ufeff]/g, '')
    .replace(/\u00a0|\u202f|\u2007/g, ' ')
    .replace(/\u2019|\u2018/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .trim()
}

function normPhrase(value: string): string {
  return tidyInput(value)
    .toLowerCase()
    .replace(/[.,!?]+$/g, '')
    .replace(/\s+/g, ' ')
}

function fillMatches(accepted: readonly string[], submission: string): boolean {
  const got = normPhrase(submission)
  return accepted.some((item) => normPhrase(item) === got)
}

function fillWrongMessage(exercise: Exercise, submission: string): string {
  const reason = exercise.explainWrong.trim()
  const typed = submission.trim()
  const examples = [...new Set(exercise.accepted)].slice(0, 3).join(', ')
  if (!typed) return reason
  return `${reason} Você digitou: ${typed}. Formas que passam: ${examples}.`
}

export function checkAnswer(exercise: Exercise, submission: unknown): CheckResult {
  let ok = false
  if (exercise.type === 'multiple_choice') {
    ok = String(submission) === String(exercise.answer)
  } else if (exercise.type === 'fill_blank') {
    ok = fillMatches(exercise.accepted, String(submission))
  } else if (exercise.type === 'order_phrase') {
    const got = Array.isArray(submission) ? submission.map(String) : []
    const expected = exercise.lines
    ok = got.length === expected.length && got.every((line, i) => line === expected[i])
  }
  const message = ok
    ? exercise.explainCorrect
    : exercise.type === 'fill_blank'
      ? fillWrongMessage(exercise, String(submission))
      : exercise.explainWrong
  return { correct: ok, message }
}

export function challengePassThreshold(total: number): number {
  return Math.max(1, Math.ceil(total * 0.75))
}

const PLACEHOLDER = /lorem ipsum|#\s*todo\b|#\s*placeholder|\.{3}/i

export function assertTheoryComplete(unitId: string, spec: Theory): void {
  if (spec.concept.trim().length < 40) {
    throw new Error(`Unidade ${unitId}: conceito teórico curto demais.`)
  }
  if (spec.culture.trim().length < 40) {
    throw new Error(`Unidade ${unitId}: contexto cultural curto demais.`)
  }
  if (spec.examples.length < 2) {
    throw new Error(`Unidade ${unitId}: precisa de pelo menos 2 exemplos reais.`)
  }
  for (const example of spec.examples) {
    if (!example.english.trim() || !example.translation.trim()) {
      throw new Error(`Unidade ${unitId}: exemplo precisa de inglês e tradução.`)
    }
    if (PLACEHOLDER.test(example.english) || PLACEHOLDER.test(example.translation)) {
      throw new Error(`Unidade ${unitId}: exemplo com placeholder.`)
    }
  }
}

export function assertExplanation(exercise: Exercise): void {
  if (!exercise.nativePhrase.trim()) {
    throw new Error(`Exercício ${exercise.id}: falta nativePhrase em inglês.`)
  }
  if (exercise.explainCorrect.trim().length < 40) {
    throw new Error(`Exercício ${exercise.id}: explainCorrect curto demais.`)
  }
  if (exercise.explainWrong.trim().length < 40) {
    throw new Error(`Exercício ${exercise.id}: explainWrong curto demais.`)
  }
  if (/^(certo|ok|isso|parabéns)!?$/i.test(exercise.explainCorrect.trim())) {
    throw new Error(`Exercício ${exercise.id}: acerto sem explicar o motivo.`)
  }
  if (/^(errado|incorreto|não|ainda não)!?\.?$/i.test(exercise.explainWrong.trim())) {
    throw new Error(`Exercício ${exercise.id}: erro sem explicar o motivo correto.`)
  }
}

export function bandRank(band: PlacementBand): number {
  if (band === 'iniciante') return 0
  if (band === 'intermediario') return 1
  return 2
}

export function levelUnlockRank(levelId: string): number {
  if (levelId === 'basico') return 0
  if (levelId === 'intermediario') return 1
  if (levelId === 'avancado') return 2
  return 3
}
