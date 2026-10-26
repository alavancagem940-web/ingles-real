export type GlossaryTerm = {
  id: string
  title: string
  body: string
  pattern: RegExp
}

export const GLOSSARY: readonly GlossaryTerm[] = [
  {
    id: 'phrasal-verb',
    title: 'Phrasal verb',
    body: 'Phrasal verb é a união de um verbo com uma preposição ou partícula que muda totalmente o sentido. Hang out não é “pendurar fora”: é passar tempo com alguém.',
    pattern: /phrasal verb/i,
  },
  {
    id: 'idiom',
    title: 'Idiom',
    body: 'Idiom é uma expressão pronta. O sentido não sai da tradução palavra por palavra. Piece of cake não é um pedaço de bolo: é algo fácil.',
    pattern: /\bidiom\b/i,
  },
  {
    id: 'slang',
    title: 'Slang',
    body: 'Slang é gíria do dia a dia. Muitas vezes o dicionário formal não ensina o mesmo uso. Low-key, por exemplo, suaviza o que vem depois.',
    pattern: /\b(slang|gíria)\b/i,
  },
  {
    id: 'reducao',
    title: 'Redução',
    body: 'Redução é o encolhimento da fala. Going to vira gonna, want to vira wanna, got to vira gotta. O escrito formal continua inteiro.',
    pattern: /redu(ç|c)(ão|oes|ões)/i,
  },
]

export function firstUnseenTerm(text: string, seen: readonly string[]): GlossaryTerm | null {
  for (const term of GLOSSARY) {
    if (seen.includes(term.id)) continue
    if (term.pattern.test(text)) return term
  }
  return null
}
