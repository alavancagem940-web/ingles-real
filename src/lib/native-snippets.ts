import { LEVELS } from './lessons'

const SHORT_OK = new Set([
  'ya',
  'bet',
  'out',
  'up',
  'off',
  'in',
  'on',
  'gonna',
  'wanna',
  'gotta',
  'kinda',
  'whatcha',
  'shoulda',
  'coulda',
  'didja',
  'lemme',
  'gimme',
  'into',
])

let catalog: string[] | null = null

function keepPhrase(phrase: string): boolean {
  const clean = phrase.trim()
  if (clean.length < 2) return false
  if (/\s/.test(clean)) return true
  if (SHORT_OK.has(clean.toLowerCase())) return true
  return clean.length >= 4
}

function taughtPhrases(): string[] {
  if (catalog) return catalog
  const found = new Set<string>(SHORT_OK)
  for (const level of LEVELS) {
    for (const unit of level.units) {
      for (const example of unit.theory.examples) found.add(example.english.trim())
      for (const exercise of unit.exercises) {
        found.add(exercise.nativePhrase.trim())
        for (const line of exercise.lines) found.add(line.trim())
        for (const phrase of exercise.phrases) found.add(phrase.trim())
        if (exercise.choicesAreEnglish) {
          for (const choice of exercise.choices) found.add(choice.trim())
        }
      }
    }
  }
  catalog = [...found].filter(keepPhrase).sort((left, right) => right.length - left.length)
  return catalog
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findPhrase(text: string, phrase: string): Array<{ start: number; end: number }> {
  const re = new RegExp(`(?:^|[^A-Za-z0-9'])(${escapeRegExp(phrase)})(?=$|[^A-Za-z0-9'])`, 'gi')
  const hits: Array<{ start: number; end: number }> = []
  for (const match of text.matchAll(re)) {
    const word = match[1]
    if (!word || match.index == null) continue
    const start = match.index + match[0].length - word.length
    hits.push({ start, end: start + word.length })
  }
  return hits
}

/** English pieces to play after Francisca finishes the whole explanation. */
export function nativePhrasesIn(text: string, anchors: readonly string[] = []): string[] {
  const found: Array<{ phrase: string; at: number }> = []
  const seen = new Set<string>()
  const add = (phrase: string, at: number) => {
    const clean = phrase.replace(/\s+/g, ' ').trim()
    const key = clean.toLowerCase()
    if (clean.length < 2 || seen.has(key)) return
    seen.add(key)
    found.push({ phrase: clean, at })
  }

  anchors.forEach((anchor, index) => add(anchor, -1000 + index))

  const occupied = new Array<boolean>(text.length).fill(false)
  for (const phrase of taughtPhrases()) {
    for (const hit of findPhrase(text, phrase)) {
      if (occupied.slice(hit.start, hit.end).some(Boolean)) continue
      for (let index = hit.start; index < hit.end; index += 1) occupied[index] = true
      add(text.slice(hit.start, hit.end), hit.start)
    }
  }

  found.sort((left, right) => left.at - right.at || right.phrase.length - left.phrase.length)
  return found.map((item) => item.phrase)
}
