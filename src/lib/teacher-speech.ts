export type TeacherLang = 'en' | 'pt'

export type TeacherSegment = {
  lang: TeacherLang
  text: string
}

const PT_WORD =
  /^(os|as|um|uma|uns|umas|de|do|da|dos|das|em|no|na|nos|nas|por|para|pra|com|sem|que|se|não|nao|ou|mas|como|mais|menos|já|ja|só|so|ao|aos|seu|sua|seus|suas|ele|ela|eles|elas|você|voce|vocês|voces|isso|isto|esse|essa|este|esta|aqui|ali|lá|la|muito|pouco|bem|mal|fala|falado|falar|vira|virar|entre|amigos|amigo|informal|formal|oi|pedido|resposta|longa|curta|casual|cumprimento|lugar|verdade|obrigação|obrigacao|pressa|preciso|ir|fácil|facil|moleza|nada|ver|sobremesa|encontrar|acaso|atropelar|outro|sentido|suaviza|drama|cansado|fazer|cena|ouça|ouca|ouvir|inglês|ingles|americano|americana|natural|pergunta|frase|verbo|pede|eua|são|sao|ser|estão|estao|foi|era|tem|quando|onde|porque|também|tambem|então|entao|assim|depois|antes|sobre|até|ate|desde|durante|contra|segundo|primeiro|último|ultimo|certo|errada|errado|correto|significado|quer|dizer|dia|noite|casa|telefone|desligar|passar|tempo|junto|relaxado|obrigado|significa)$/i

const EN_WORD =
  /^(i|i'm|im|you|you're|youre|the|an|to|of|and|or|gonna|wanna|gotta|hey|what|what's|whats|up|going|call|later|hang|out|yeah|nope|run|into|over|piece|cake|worries|welcome|got|have|am|is|are|it|it's|its|that|this|do|does|did|we|they|he|she|my|your|me|us|be|been|not|don't|dont|can't|cant|will|just|really|kind|kinda|ok|okay|hello|hi|bye|yep|yes|please|thanks|sorry|cool|sure|low|low-key|key|someone)$/i

function coreWord(token: string): string {
  return token
    .toLowerCase()
    .replace(/[“”"'.,!?;:()[\]…—–→-]+/g, '')
    .replace(/’/g, "'")
}

function markWord(token: string): TeacherLang | 'neu' | 'skip' {
  const word = coreWord(token)
  if (!word) return 'skip'
  if (/[áàâãéêíóôõúüç]/i.test(token)) return 'pt'
  if (PT_WORD.test(word)) return 'pt'
  if (EN_WORD.test(word)) return 'en'
  if (/^[a-z][a-z'-]*$/i.test(word)) return 'neu'
  return 'pt'
}

/** Portuguese explanation with the English quote handed to Jenny. */
export function teacherSegments(text: string): TeacherSegment[] {
  const tokens = text.trim().split(/\s+/).filter(Boolean)
  const marks = tokens.map((token) => markWord(token))

  for (let i = 0; i < marks.length; i += 1) {
    if (marks[i] !== 'neu') continue
    let start = i
    while (start > 0 && (marks[start - 1] === 'neu' || marks[start - 1] === 'en')) start -= 1
    let end = i
    while (end < marks.length - 1 && (marks[end + 1] === 'neu' || marks[end + 1] === 'en')) end += 1
    const definiteEn = marks.slice(start, end + 1).some((mark) => mark === 'en')
    const definitePt = marks.slice(start, end + 1).some((mark) => mark === 'pt')
    if (definiteEn && !definitePt) marks[i] = 'en'
  }

  const segments: TeacherSegment[] = []
  for (let i = 0; i < tokens.length; i += 1) {
    const mark = marks[i]
    if (mark === 'skip') continue
    const lang: TeacherLang = mark === 'en' ? 'en' : 'pt'
    const last = segments[segments.length - 1]
    if (last && last.lang === lang) last.text = `${last.text} ${tokens[i]}`
    else segments.push({ lang, text: tokens[i]! })
  }
  return segments.filter((segment) => segment.text.trim())
}
