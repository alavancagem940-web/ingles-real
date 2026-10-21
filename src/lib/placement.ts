export type PlacementBand = 'iniciante' | 'intermediario' | 'avancado'
export type PlacementDifficulty = 'easy' | 'medium' | 'hard'

export type PlacementQuestion = {
  id: string
  difficulty: PlacementDifficulty
  prompt: string
  nativePhrase: string
  choicesAreEnglish: boolean
  choices: string[]
  answer: string
  explainCorrect: string
  explainWrong: string
}

export const PLACEMENT_PASS = 2

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'p_easy_1',
    difficulty: 'easy',
    prompt: 'O que essa saudação americana quer dizer no dia a dia?',
    nativePhrase: "Hey, what's up?",
    choicesAreEnglish: false,
    choices: ['Oi, e aí?', 'Com licença, senhor.', 'Boa noite formal.', 'Até nunca mais.'],
    answer: 'Oi, e aí?',
    explainCorrect: "Hey, what's up? é um oi informal entre amigos nos EUA. Não pede uma resposta longa.",
    explainWrong: "A fala casual é Hey, what's up? — um oi, não um cumprimento formal.",
  },
  {
    id: 'p_easy_2',
    difficulty: 'easy',
    prompt: 'Como um americano fala “eu vou ligar” na conversa?',
    nativePhrase: "I'm gonna call you.",
    choicesAreEnglish: true,
    choices: ["I'm gonna call you.", 'I will to call you.', 'I going call you.', 'I wanna calling you.'],
    answer: "I'm gonna call you.",
    explainCorrect: 'Going to vira gonna na fala: I am going to call you → I’m gonna call you.',
    explainWrong: 'O inglês falado usa gonna, não will to nem I going. Ouça I’m gonna call you.',
  },
  {
    id: 'p_easy_3',
    difficulty: 'easy',
    prompt: 'O que a pessoa está perguntando?',
    nativePhrase: "Whatcha doin'?",
    choicesAreEnglish: false,
    choices: ['O que você está fazendo?', 'Onde você mora?', 'Que horas são?', 'Você fala espanhol?'],
    answer: 'O que você está fazendo?',
    explainCorrect: "Whatcha doin'? é What are you doing? reduzido, super comum no falado.",
    explainWrong: "Whatcha doin'? pergunta o que você está fazendo agora, não onde você mora.",
  },
  {
    id: 'p_mid_1',
    difficulty: 'medium',
    prompt: 'Qual phrasal verb significa “sair com amigos, passar tempo”?',
    nativePhrase: 'Wanna hang out later?',
    choicesAreEnglish: true,
    choices: ['Wanna hang out later?', 'Wanna hang up later?', 'Wanna hang in later?', 'Wanna hang over later?'],
    answer: 'Wanna hang out later?',
    explainCorrect: 'Hang out = passar tempo junto. Hang up é desligar o telefone. Ouça wanna hang out.',
    explainWrong: 'Hang out é o convite. Hang up desliga a ligação. A frase nativa é Wanna hang out later?',
  },
  {
    id: 'p_mid_2',
    difficulty: 'medium',
    prompt: 'O que “I gotta go” comunica?',
    nativePhrase: 'I gotta go.',
    choicesAreEnglish: false,
    choices: ['Eu preciso ir.', 'Eu já fui.', 'Eu quero ficar.', 'Eu vou pensar.'],
    answer: 'Eu preciso ir.',
    explainCorrect: 'Gotta vem de got to / have got to: obrigação ou pressa. I gotta go = preciso ir.',
    explainWrong: 'Gotta marca necessidade agora. I gotta go não significa “já fui” nem “quero ficar”.',
  },
  {
    id: 'p_mid_3',
    difficulty: 'medium',
    prompt: 'Qual resposta soa natural depois de um “thanks” nos EUA?',
    nativePhrase: 'No worries.',
    choicesAreEnglish: true,
    choices: ['No worries.', 'Please, you welcome very.', 'Yes, I am thanks.', 'Not a problem you.'],
    answer: 'No worries.',
    explainCorrect: 'No worries é o “de nada” relaxado americano, no lugar de you’re welcome formal.',
    explainWrong: 'A resposta nativa curta é No worries. As outras soam traduzidas palavra por palavra.',
  },
  {
    id: 'p_hard_1',
    difficulty: 'hard',
    prompt: 'O que o idiom quer dizer?',
    nativePhrase: "That's a piece of cake.",
    choicesAreEnglish: false,
    choices: ['É moleza.', 'Está um bolo gostoso.', 'É uma fatia cara.', 'É um problema grave.'],
    answer: 'É moleza.',
    explainCorrect: 'Piece of cake = fácil, moleza. Nada a ver com sobremesa de verdade.',
    explainWrong: 'Não é bolo literal. That’s a piece of cake significa que a tarefa é fácil.',
  },
  {
    id: 'p_hard_2',
    difficulty: 'hard',
    prompt: 'Qual frase usa o phrasal verb de “encontrar por acaso”?',
    nativePhrase: 'I ran into my teacher at the store.',
    choicesAreEnglish: true,
    choices: [
      'I ran into my teacher at the store.',
      'I ran over my teacher at the store.',
      'I ran out my teacher at the store.',
      'I ran up my teacher at the store.',
    ],
    answer: 'I ran into my teacher at the store.',
    explainCorrect: 'Run into someone = encontrar por acaso. Run over é atropelar — outro sentido.',
    explainWrong: 'O encontro casual é run into. Run over muda o significado por completo.',
  },
  {
    id: 'p_hard_3',
    difficulty: 'hard',
    prompt: 'O que “low-key” adiciona nesta fala?',
    nativePhrase: "I'm low-key tired.",
    choicesAreEnglish: false,
    choices: [
      'Estou cansado, mas sem alarde.',
      'Estou oficialmente esgotado.',
      'Estou com a chave baixa.',
      'Estou animado demais.',
    ],
    answer: 'Estou cansado, mas sem alarde.',
    explainCorrect: 'Low-key suaviza: um pouco, sem drama. I’m low-key tired = cansado, sem fazer cena.',
    explainWrong: 'Low-key não é chave. É gíria de intensidade baixa: um pouco, discretamente.',
  },
]

export function questionsForRound(difficulty: PlacementDifficulty): PlacementQuestion[] {
  return PLACEMENT_QUESTIONS.filter((item) => item.difficulty === difficulty)
}

export function nextPlacementDifficulty(
  current: PlacementDifficulty,
  correctInRound: number,
): PlacementDifficulty | 'done' {
  if (correctInRound < PLACEMENT_PASS) return 'done'
  if (current === 'easy') return 'medium'
  if (current === 'medium') return 'hard'
  return 'done'
}

export function bandFromProgress(reached: PlacementDifficulty, lastRoundCorrect: number): PlacementBand {
  if (reached === 'easy') return 'iniciante'
  if (reached === 'medium') {
    return lastRoundCorrect >= PLACEMENT_PASS ? 'intermediario' : 'iniciante'
  }
  return lastRoundCorrect >= PLACEMENT_PASS ? 'avancado' : 'intermediario'
}

export const BAND_LABEL: Record<PlacementBand, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export const BAND_UNLOCK_COPY: Record<PlacementBand, string> = {
  iniciante: 'Módulos do Básico destrancados. Intermediário abre depois do desafio.',
  intermediario: 'Básico e Intermediário destrancados. Você não precisa recomeçar do zero.',
  avancado: 'Básico, Intermediário e Avançado destrancados. Fluência abre no desafio do Avançado.',
}
