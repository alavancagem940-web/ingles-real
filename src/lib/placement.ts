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

export const PLACEMENT_ROUND_SIZE = 5

/** About 80% of the round. Missing most of the block does not open the next one. */
export function placementPassMark(roundSize: number): number {
  return Math.max(1, Math.ceil(roundSize * 0.8))
}

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
  {
    id: 'p_easy_4',
    difficulty: 'easy',
    prompt: 'O que “See ya” quer dizer na despedida?',
    nativePhrase: 'See ya.',
    choicesAreEnglish: false,
    choices: ['Até mais.', 'Por favor, entre.', 'Bom dia formal.', 'Não entendi.'],
    answer: 'Até mais.',
    explainCorrect: 'See ya é see you reduzido. É um até mais entre amigos, não um cumprimento formal de bom dia.',
    explainWrong: 'See ya não pede para entrar nem dá bom dia. É a despedida curta: até mais.',
  },
  {
    id: 'p_easy_5',
    difficulty: 'easy',
    prompt: 'A pessoa respondeu “I’m down”. O que ela aceitou?',
    nativePhrase: "Yeah, I'm down.",
    choicesAreEnglish: false,
    choices: ['Topo, eu vou.', 'Estou caído no chão.', 'Estou triste demais.', 'Não posso ir.'],
    answer: 'Topo, eu vou.',
    explainCorrect: "I'm down é topar o plano. Yeah, I'm down significa que a pessoa vai, não que caiu nem que está triste.",
    explainWrong: "I'm down não é queda nem tristeza. Na conversa, é um sim: topo, eu vou.",
  },
  {
    id: 'p_easy_6',
    difficulty: 'easy',
    prompt: 'O que “How about you?” pede de volta?',
    nativePhrase: 'Not much. How about you?',
    choicesAreEnglish: false,
    choices: ['E você?', 'Que horas são?', 'Onde fica isso?', 'Pode repetir?'],
    answer: 'E você?',
    explainCorrect: 'How about you? devolve a pergunta para a outra pessoa: e você? Não pede a hora nem um endereço.',
    explainWrong: 'How about you? não pergunta as horas. É o “e você?” depois de responder um oi.',
  },
  {
    id: 'p_easy_7',
    difficulty: 'easy',
    prompt: 'Alguém perguntou o que há de novo e ouviu “Not much”. O que isso quer dizer?',
    nativePhrase: 'Not much.',
    choicesAreEnglish: false,
    choices: ['Nada de mais.', 'Muito obrigado.', 'Estou com pressa.', 'Não falo inglês.'],
    answer: 'Nada de mais.',
    explainCorrect: 'Not much responde um oi: nada de mais. É uma resposta leve, não um obrigado nem um aviso de pressa.',
    explainWrong: 'Not much não é obrigado e não diz que a pessoa está com pressa. É “nada de mais”.',
  },
  {
    id: 'p_easy_8',
    difficulty: 'easy',
    prompt: 'O que “you guys” faz nesta pergunta?',
    nativePhrase: 'Are you guys ready?',
    choicesAreEnglish: false,
    choices: ['Fala com o grupo.', 'Fala só com um homem.', 'Pergunta a idade.', 'Pede desculpas.'],
    answer: 'Fala com o grupo.',
    explainCorrect: 'You guys é o vocês informal americano, para o grupo inteiro. Are you guys ready? pergunta se todo mundo está pronto.',
    explainWrong: 'You guys não escolhe só um homem e não pergunta idade. É o grupo: vocês estão prontos?',
  },
  {
    id: 'p_mid_4',
    difficulty: 'medium',
    prompt: 'O que “I shoulda left earlier” admite?',
    nativePhrase: 'I shoulda left earlier.',
    choicesAreEnglish: false,
    choices: ['Eu deveria ter saído antes.', 'Eu saí cedo demais.', 'Eu vou sair agora.', 'Eu não preciso sair.'],
    answer: 'Eu deveria ter saído antes.',
    explainCorrect: 'Shoulda vem de should have. I shoulda left earlier é arrependimento: deveria ter saído mais cedo.',
    explainWrong: 'Shoulda olha para trás. I shoulda left earlier não diz que a pessoa saiu cedo demais.',
  },
  {
    id: 'p_mid_5',
    difficulty: 'medium',
    prompt: 'O que “We coulda taken a cab” diz?',
    nativePhrase: 'We coulda taken a cab.',
    choicesAreEnglish: false,
    choices: ['A gente poderia ter pego um táxi.', 'A gente pegou o táxi.', 'O táxi quebrou.', 'A gente não tem dinheiro.'],
    answer: 'A gente poderia ter pego um táxi.',
    explainCorrect: 'Coulda é could have na fala. We coulda taken a cab é uma chance que passou: dava para ter pego um táxi.',
    explainWrong: 'Coulda não afirma que o táxi foi pego. É “poderia ter pego”, uma possibilidade que não rolou.',
  },
  {
    id: 'p_mid_6',
    difficulty: 'medium',
    prompt: 'O que “I’ll pick you up at seven” combina?',
    nativePhrase: "I'm gonna pick you up at seven.",
    choicesAreEnglish: false,
    choices: ['Eu te busco às sete.', 'Eu te ligo às sete.', 'Eu te acordo às sete.', 'Eu chego sozinho às sete.'],
    answer: 'Eu te busco às sete.',
    explainCorrect: "Pick you up é buscar a pessoa. I'm gonna pick you up at seven combina a busca às sete, não uma ligação.",
    explainWrong: 'Pick you up não é telefonema. É buscar alguém. A combinação é às sete.',
  },
  {
    id: 'p_mid_7',
    difficulty: 'medium',
    prompt: 'O que “My bad” admite?',
    nativePhrase: 'My bad.',
    choicesAreEnglish: false,
    choices: ['Foi mal, a culpa foi minha.', 'Está tudo ótimo.', 'Não foi comigo.', 'Pode deixar que eu pago.'],
    answer: 'Foi mal, a culpa foi minha.',
    explainCorrect: 'My bad é um foi mal rápido. A pessoa assume o erro na hora, sem discurso longo.',
    explainWrong: 'My bad não elogia e não oferece pagamento. É assumir: foi mal, a culpa foi minha.',
  },
  {
    id: 'p_mid_8',
    difficulty: 'medium',
    prompt: 'Depois de um pedido, a pessoa disse “You bet”. O que ela respondeu?',
    nativePhrase: 'You bet.',
    choicesAreEnglish: false,
    choices: ['Pode deixar, com certeza.', 'Não vou conseguir.', 'Quanto custa?', 'Repete, por favor.'],
    answer: 'Pode deixar, com certeza.',
    explainCorrect: 'You bet é um sim animado: pode deixar, com certeza. A pessoa topa na hora.',
    explainWrong: 'You bet não é recusa e não pergunta o preço. É um sim firme: pode deixar.',
  },
  {
    id: 'p_hard_4',
    difficulty: 'hard',
    prompt: 'O que “I’m a bit under the weather” comunica?',
    nativePhrase: "I'm a bit under the weather today.",
    choicesAreEnglish: false,
    choices: ['Estou meio indisposto.', 'Está chovendo em mim.', 'Estou muito animado.', 'Estou ao ar livre.'],
    answer: 'Estou meio indisposto.',
    explainCorrect: "Under the weather é um mal-estar leve. I'm a bit under the weather today quer dizer indisposto, não chuva de verdade.",
    explainWrong: 'Não é previsão do tempo. Under the weather significa que a pessoa está meio indisposta.',
  },
  {
    id: 'p_hard_5',
    difficulty: 'hard',
    prompt: 'O que “Let’s call it a day” propõe?',
    nativePhrase: "Let's call it a day and hit the road.",
    choicesAreEnglish: false,
    choices: ['Vamos parar por hoje.', 'Vamos marcar um dia.', 'Vamos começar agora.', 'Vamos contar as horas.'],
    answer: 'Vamos parar por hoje.',
    explainCorrect: 'Call it a day é encerrar por hoje. Hit the road, logo depois, é ir embora. A proposta é parar e sair.',
    explainWrong: 'Call it a day não marca um encontro novo. É encerrar o que já estava sendo feito hoje.',
  },
  {
    id: 'p_hard_6',
    difficulty: 'hard',
    prompt: 'O que “kinda” faz em “I’m kinda busy”?',
    nativePhrase: "I'm kinda busy right now.",
    choicesAreEnglish: false,
    choices: ['Suaviza: meio ocupado.', 'Diz que está livre.', 'Marca o horário oficial.', 'Pergunta se pode ajudar.'],
    answer: 'Suaviza: meio ocupado.',
    explainCorrect: "Kinda vem de kind of. I'm kinda busy right now é meio ocupado agora, um aviso leve, não um não absoluto.",
    explainWrong: 'Kinda não diz que a pessoa está livre. Suaviza a ocupação: meio ocupado agora.',
  },
  {
    id: 'p_hard_7',
    difficulty: 'hard',
    prompt: 'Qual frase usa o phrasal verb de “bolar, ter uma ideia”?',
    nativePhrase: 'We need to come up with a plan.',
    choicesAreEnglish: true,
    choices: [
      'We need to come up with a plan.',
      'We need to come down with a plan.',
      'We need to come over with a plan.',
      'We need to come off with a plan.',
    ],
    answer: 'We need to come up with a plan.',
    explainCorrect: 'Come up with é bolar ou apresentar uma ideia. We need to come up with a plan pede um plano. Come down with é ficar doente.',
    explainWrong: 'A ideia nova é come up with. Come down with muda o sentido: é adoecer, não bolar um plano.',
  },
  {
    id: 'p_hard_8',
    difficulty: 'hard',
    prompt: 'O que “I need to head out” avisa?',
    nativePhrase: 'I need to head out.',
    choicesAreEnglish: false,
    choices: ['Preciso ir embora.', 'Preciso de um chapéu.', 'Vou entrar agora.', 'Quero ficar mais.'],
    answer: 'Preciso ir embora.',
    explainCorrect: 'Head out é ir saindo. I need to head out avisa que a pessoa precisa ir embora, não que vai entrar.',
    explainWrong: 'Head out não é chapéu e não é ficar. É o aviso de saída: preciso ir embora.',
  },
]

export function questionsForRound(difficulty: PlacementDifficulty): PlacementQuestion[] {
  return PLACEMENT_QUESTIONS.filter((item) => item.difficulty === difficulty)
}

export function drawPlacementRound(
  difficulty: PlacementDifficulty,
  random: () => number = Math.random,
): PlacementQuestion[] {
  const pool = [...questionsForRound(difficulty)]
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = pool[index]!
    pool[index] = pool[swap]!
    pool[swap] = current
  }
  return pool.slice(0, Math.min(PLACEMENT_ROUND_SIZE, pool.length))
}

export function nextPlacementDifficulty(
  current: PlacementDifficulty,
  correctInRound: number,
  roundSize = PLACEMENT_ROUND_SIZE,
): PlacementDifficulty | 'done' {
  if (correctInRound < placementPassMark(roundSize)) return 'done'
  if (current === 'easy') return 'medium'
  if (current === 'medium') return 'hard'
  return 'done'
}

export function bandFromProgress(
  reached: PlacementDifficulty,
  lastRoundCorrect: number,
  roundSize = PLACEMENT_ROUND_SIZE,
): PlacementBand {
  const passed = lastRoundCorrect >= placementPassMark(roundSize)
  if (reached === 'easy') return 'iniciante'
  if (reached === 'medium') return passed ? 'intermediario' : 'iniciante'
  return passed ? 'avancado' : 'intermediario'
}

export const BAND_LABEL: Record<PlacementBand, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export const BAND_UNLOCK_COPY: Record<PlacementBand, string> = {
  iniciante:
    'A trilha começa no Básico. Cada lição pede cerca de 75% de acertos para abrir a próxima. Intermediário abre no desafio.',
  intermediario:
    'A trilha começa no Intermediário, no nível que o teste marcou. O Básico fica aberto para revisar. Cada lição pede cerca de 75% para abrir a próxima.',
  avancado:
    'A trilha começa no Avançado. Os módulos anteriores ficam abertos para revisar. Fluência abre no desafio do Avançado.',
}
