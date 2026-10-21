import {
  challenge,
  fill,
  lesson,
  mcEn,
  mcPt,
  order,
  theory,
  type Level,
} from '../lesson-core'

export const avancado: Level = {
  id: 'avancado',
  order: 3,
  band: 'Avançado',
  title: 'Idioms, gírias e phrasal verbs',
  description:
    'Piece of cake, under the weather, kinda, low-key, run into, come up with. Inglês de quem já conversa.',
  unlocksAt: 'avancado',
  units: [
    lesson(
      'a1_idioms',
      'Idioms na rua',
      'Moleza, resfriado, gelo social e fim de expediente',
      60,
      theory({
        concept:
          'Idiom é bloco cujo sentido não está nas palavras. Piece of cake = fácil. Under the weather = indisposto. Break the ice = quebrar o gelo social. Hit the road = partir. Call it a day = encerrar o trabalho. Se você traduz bolo, clima ou gelo, a conversa vira desenho. O treino é ouvir o bloco e ligar à situação: tarefa fácil, alguém doente, reunião fria, hora de ir embora.',
        culture:
          'Americanos soltam idiom no trabalho informal e entre amigos. Piece of cake não ofende se a tarefa era simples; pode soar arrogante se o outro está sofrendo. Under the weather é um jeito educado de não detalhar o sintoma. Call it a day às 17h é cultura de expediente, não preguiça. Ouça o ritmo: that’s a piece of cake, quase uma só palavra.',
        examples: [
          {
            caption: 'Tarefa fácil',
            english: "Don't stress. That's a piece of cake.",
            translation: 'Não se estressa. É moleza.',
          },
          {
            caption: 'Não está bem',
            english: "I'm a bit under the weather today.",
            translation: 'Estou um pouco indisposto hoje.',
          },
          {
            caption: 'Encerrar',
            english: "Let's call it a day and hit the road.",
            translation: 'Vamos encerrar por hoje e ir embora.',
          },
        ],
      }),
      [
        mcPt(
          'a1_q1',
          'That’s a piece of cake significa:',
          "That's a piece of cake.",
          ['É fácil.', 'É um bolo caro.', 'É um problema enorme.', 'É hora do lanche.'],
          'É fácil.',
          'Piece of cake = moleza. O bolo é só a imagem, não a sobremesa.',
          'Não peça fatia. O idiom fala de facilidade, não de comida.',
        ),
        mcEn(
          'a1_q2',
          'Qual frase diz que a pessoa está indisposta?',
          "I'm under the weather.",
          [
            "I'm under the weather.",
            "I'm over the rain.",
            "I'm inside the climate.",
            "I'm below the cake.",
          ],
          "I'm under the weather.",
          'Under the weather = não está se sentindo bem. As outras são calque.',
          'A nativa é I’m under the weather. Não traduza “embaixo do tempo”.',
        ),
        fill(
          'a1_q3',
          'Quebrar o gelo social: break the _____.',
          'Break the ice.',
          ['ice', 'the ice', 'break the ice'],
          'Break the ice = começar a conversa quando o clima está travado.',
          'A palavra é ice. Break the ice, não break the glass neste idiom.',
        ),
        order(
          'a1_q4',
          'Monte o encerramento do dia.',
          "Let's call it a day.",
          ["Let's", 'call', 'it', 'a', 'day.'],
          'Let’s call it a day = chega por hoje. It e a day são o bloco fixo.',
          'Call it a day fica nesta ordem. Não invente call the day it.',
        ),
        mcPt(
          'a1_q5',
          'Hit the road, na despedida, é:',
          "We should hit the road.",
          ['Partir, ir embora.', 'Bater no asfalto.', 'Construir uma estrada.', 'Dirigir com raiva.'],
          'Partir, ir embora.',
          'Hit the road = ir embora, pegar a estrada no sentido de sair.',
          'Não é agressão. We should hit the road = é melhor a gente ir.',
        ),
      ],
    ),
    lesson(
      'a2_slang',
      'Gírias leves',
      'Kinda, sorta, dude, low-key, bet, no cap',
      60,
      theory({
        concept:
          'Gíria americana muda rápido, mas um núcleo permanece. Kinda / sorta suavizam (kind of / sort of). Dude chama a pessoa, nem sempre homem. Low-key reduz a intensidade: I’m low-key tired = cansado, sem alarde. Bet confirma, como “fechou”. No cap (mais jovem) = sem mentira, sério. Esta trilha não ensina xingamento nem flerte: só marcações de tom que você vai ouvir em série e campus.',
        culture:
          'Kinda é de qualquer idade. Dude atravessou décadas. Bet e no cap são mais geração recente — use se o grupo já usa; com um chefe de 60 anos, prefira for sure. Low-key virou advérbio de intensidade, não “chave baixa”. High-key é o contrário (bem explícito), mas aparece menos. Ouça kinda com o d reduzido: kinna.',
        examples: [
          {
            caption: 'Suavizar',
            english: "I'm kinda busy right now.",
            translation: 'Estou meio ocupado agora.',
          },
          {
            caption: 'Sem alarde',
            english: "That's low-key the best taco here.",
            translation: 'Sem alarde, esse é o melhor taco daqui.',
          },
          {
            caption: 'Confirmação jovem',
            english: 'You coming? Bet.',
            translation: 'Você vem? Fechou.',
          },
        ],
      }),
      [
        mcPt(
          'a2_q1',
          'I’m kinda busy suaviza o quê?',
          "I'm kinda busy.",
          [
            'O “estou ocupado”, para não soar seco.',
            'Um convite romântico.',
            'Uma ordem militar.',
            'A hora no relógio.',
          ],
          'O “estou ocupado”, para não soar seco.',
          'Kinda = kind of, amortece. I’m kinda busy deixa uma porta entreaberta.',
          'Não é flerte nem ordem. Kinda só amortece o “estou ocupado” no papo do dia a dia.',
        ),
        mcEn(
          'a2_q2',
          'Qual usa low-key do jeito nativo?',
          "I'm low-key hungry.",
          ["I'm low-key hungry.", "I'm low key the door.", "I'm low of hungry.", "I'm key low hungry."],
          "I'm low-key hungry.",
          'Low-key + adjetivo. I’m low-key hungry = um pouco com fome, sem drama.',
          'Low-key não é chave. Fica antes do adjetivo: low-key hungry.',
        ),
        fill(
          'a2_q3',
          'Confirmação curta (gíria): You coming? _____.',
          'You coming? Bet.',
          ['Bet', 'bet', 'Bet.'],
          'Bet sozinho confirma. Equivale a for sure / okay, num tom mais novo.',
          'A peça é Bet. Não escreva I bet you money neste item.',
        ),
        order(
          'a2_q4',
          'Monte a fala com sorta.',
          "It's sorta a big deal.",
          ["It's", 'sorta', 'a', 'big', 'deal.'],
          'Sorta = sort of. It’s sorta a big deal = é meio importante.',
          'Sorta fica antes de a big deal, suavizando o peso.',
        ),
        mcPt(
          'a2_q5',
          'No cap, em fala jovem, marca:',
          "I'm serious. No cap.",
          [
            'Que a pessoa não está mentindo.',
            'Que ela perdeu o boné.',
            'Que o limite de gasto acabou.',
            'Que a conversa é sobre beisebol.',
          ],
          'Que a pessoa não está mentindo.',
          'No cap = sem mentira, falando sério. Cap como gíria é mentira.',
          'Não é boné. No cap reforça a sinceridade da frase anterior.',
        ),
      ],
    ),
    lesson(
      'a3_phrasal_advanced',
      'Phrasal verbs avançados',
      'Run into, come up with, look forward to, put off, get away with',
      60,
      theory({
        concept:
          'Estes phrasal verbs carregam história. Run into someone = encontrar por acaso (não atropelar, que seria run over). Come up with = inventar uma ideia. Look forward to = estar ansioso (positivo) por algo — o to pede verbo em -ing: looking forward to seeing you. Put off = adiar. Get away with = safar-se sem punição. A partícula muda tudo: put off ≠ put on ≠ put up with.',
        culture:
          'Look forward to é o encerramento educado de e-mail americano e também fala sincera entre amigos. Put off the meeting é o pesadelo de quem marca agenda. Get away with só funciona se havia regra: he got away with it. Run into no corredor do supermercado é o encontro clássico. Ouça into reduzido: run inta.',
        examples: [
          {
            caption: 'Encontro no supermercado',
            english: 'I ran into Maya at the store.',
            translation: 'Encontrei a Maya por acaso no mercado.',
          },
          {
            caption: 'Ideia',
            english: 'We need to come up with a plan.',
            translation: 'A gente precisa criar um plano.',
          },
          {
            caption: 'Expectativa boa',
            english: "I'm looking forward to seeing you.",
            translation: 'Estou ansioso para te ver.',
          },
        ],
      }),
      [
        mcPt(
          'a3_q1',
          'I ran into my teacher significa:',
          'I ran into my teacher.',
          [
            'Encontrei meu professor por acaso.',
            'Atropelei meu professor.',
            'Fugi do professor.',
            'Corri para a sala.',
          ],
          'Encontrei meu professor por acaso.',
          'Run into a person = encontro. Run over seria o acidente. O contexto de teacher+store pede encontro.',
          'Não é atropelamento. Run into someone é o “esbarrei com”.',
        ),
        mcEn(
          'a3_q2',
          'Qual frase pede uma ideia nova?',
          'Come up with something.',
          [
            'Come up with something.',
            'Come down with something.',
            'Come out on something.',
            'Come off with something.',
          ],
          'Come up with something.',
          'Come up with = criar. Come down with é ficar doente. A partícula muda o verbo.',
          'A nativa de ideia é come up with. Come down with é resfriado.',
        ),
        fill(
          'a3_q3',
          'Adiar a reunião: put _____ the meeting.',
          'Put off the meeting.',
          ['off', 'put off', 'off the'],
          'Put off = adiar. Put off the meeting empurra o horário.',
          'A partícula é off. Put on seria vestir ou ligar o som, outro verbo.',
        ),
        order(
          'a3_q4',
          'Monte a expectativa educada.',
          "I'm looking forward to it.",
          ["I'm", 'looking', 'forward', 'to', 'it.'],
          'Looking forward to + it. O to faz parte do phrasal, não é infinitivo solto.',
          'A ordem é looking + forward + to. Não corte o to.',
        ),
        mcPt(
          'a3_q5',
          'He got away with it quer dizer:',
          'He got away with it.',
          [
            'Ele se safou, não pagou por isso.',
            'Ele viajou para longe com o objeto.',
            'Ele ganhou o prêmio.',
            'Ele pediu desculpas formais.',
          ],
          'Ele se safou, não pagou por isso.',
          'Get away with = escapar da consequência. O it é a infração implícita.',
          'Não é viagem. Got away with it é impunidade, não turismo.',
        ),
      ],
    ),
    challenge(
      'a4_avancado_desafio',
      'Desafio do Avançado',
      'Idioms, gíria e phrasal no mesmo recado',
      100,
      theory({
        concept:
          'O desafio cola piece of cake, low-key, run into e looking forward to. É o inglês de quem já vive no país: reunião, desculpa, encontro no mercado, plano de sexta. Ouça cada frase. Cerca de 75% abre a Fluência.',
        culture:
          'Ninguém anuncia “agora vou usar um idiom”. Eles escorregam no meio da frase. O treino é não travar quando cake, weather e ice não forem literais.',
        examples: [
          {
            caption: 'Depois da reunião',
            english: "The meeting was a piece of cake. I'm low-key tired though.",
            translation: 'A reunião foi moleza. Estou meio cansado, sem alarde.',
          },
          {
            caption: 'No mercado',
            english: 'I ran into Jordan. We should hang out.',
            translation: 'Encontrei o Jordan por acaso. A gente devia sair.',
          },
          {
            caption: 'E-mail curto',
            english: 'Looking forward to it. Bet.',
            translation: 'Já estou no aguardo. Fechou.',
          },
        ],
      }),
      [
        mcEn(
          'a4_q1',
          'Qual recado mistura idiom e gíria de verdade?',
          "It's a piece of cake. I'm low-key nervous.",
          [
            "It's a piece of cake. I'm low-key nervous.",
            "It's a cake piece. I'm key-low nervous.",
            "It's weather under. I'm cap no.",
            "It's ice break. I'm dude the busy.",
          ],
          "It's a piece of cake. I'm low-key nervous.",
          'Piece of cake + low-key nervous é o par nativo: fácil, mas um pouco nervoso.',
          'A ordem dos idioms importa. Ouça a frase completa.',
        ),
        mcPt(
          'a4_q2',
          'Looking forward to seeing you expressa:',
          "I'm looking forward to seeing you.",
          [
            'Expectativa positiva de encontro.',
            'Medo de te ver.',
            'Olhar para a frente na rua.',
            'Adiar o encontro.',
          ],
          'Expectativa positiva de encontro.',
          'Look forward to + -ing. Seeing, não see. É carinho educado, não medo.',
          'Não é put off. Looking forward to quer que a data chegue.',
        ),
        fill(
          'a4_q3',
          'Encontro por acaso: I ran _____ Sam.',
          'I ran into Sam.',
          ['into', 'in to', 'I ran into'],
          'Run into + pessoa. Into é a partícula. In to separado muda o gosto da frase.',
          'A peça que falta é into. I ran into Sam = encontrei a Sam por acaso.',
        ),
        order(
          'a4_q4',
          'Monte a desculpa com shoulda.',
          'I shoulda come up with a plan.',
          ['I', 'shoulda', 'come', 'up', 'with', 'a', 'plan.'],
          'Shoulda + come up with: arrependimento de não ter tido a ideia antes.',
          'Come up with fica junto depois de shoulda.',
        ),
        mcPt(
          'a4_q5',
          'Let’s put it off significa:',
          "Let's put it off until Monday.",
          ['Vamos adiar até segunda.', 'Vamos vestir isso segunda.', 'Vamos cancelar para sempre.', 'Vamos acelerar.'],
          'Vamos adiar até segunda.',
          'Put off + until Monday. Adia, não cancela. Put on seria vestir.',
          'Off neste phrasal é adiar. Until Monday é a nova data.',
        ),
      ],
    ),
  ],
}
