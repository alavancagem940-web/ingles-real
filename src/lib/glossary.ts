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
    body: 'É o nome de um verbo colado numa partícula, como out, up ou into. A partícula muda o sentido, então não traduz palavra por palavra. Você não precisa ter estudado esse nome: a pergunta mostra as frases.',
    pattern: /phrasal(?:\s+verbs?)?/i,
  },
  {
    id: 'idiom',
    title: 'Idiom',
    body: 'É o nome de uma expressão pronta. O sentido não é a soma das palavras. Você não precisa conhecer esse nome para responder: leia a frase em inglês e escolha o que ela quer dizer.',
    pattern: /\bidioms?\b/i,
  },
  {
    id: 'slang',
    title: 'Gíria',
    body: 'Gíria é uma palavra informal da conversa. O dicionário formal quase não ensina esse uso. O nome só avisa o tipo de palavra; o sentido está na frase.',
    pattern: /\b(?:slangs?|gírias?)\b/i,
  },
  {
    id: 'reducao',
    title: 'Redução',
    body: 'Redução é quando a fala cola palavras e corta sons. O inglês escrito continua inteiro; o falado encurta. O nome só classifica isso. A forma falada aparece na pergunta.',
    pattern: /redu(?:ção|ções|cao|coes)/i,
  },
]

export type GlossarySpan = {
  term: GlossaryTerm
  start: number
  end: number
}

export function glossarySpans(text: string): GlossarySpan[] {
  const found: GlossarySpan[] = []
  for (const term of GLOSSARY) {
    const flags = term.pattern.flags.includes('g') ? term.pattern.flags : `${term.pattern.flags}g`
    const pattern = new RegExp(term.pattern.source, flags)
    for (const match of text.matchAll(pattern)) {
      if (match.index == null || match[0].length === 0) continue
      found.push({ term, start: match.index, end: match.index + match[0].length })
    }
  }
  found.sort((left, right) => left.start - right.start || right.end - left.end)
  const kept: GlossarySpan[] = []
  let cursor = 0
  for (const span of found) {
    if (span.start < cursor) continue
    kept.push(span)
    cursor = span.end
  }
  return kept
}

export function firstUnseenTerm(text: string, seen: readonly string[]): GlossaryTerm | null {
  for (const span of glossarySpans(text)) {
    if (!seen.includes(span.term.id)) return span.term
  }
  return null
}
