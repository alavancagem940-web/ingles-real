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

export const basico: Level = {
  id: 'basico',
  order: 1,
  band: 'Básico',
  title: 'Fala do dia a dia',
  description:
    'Cumprimentos, gonna, wanna, whatcha e o you reduzido. Inglês que você ouve na rua nos EUA, com tradução.',
  unlocksAt: 'iniciante',
  units: [
    lesson(
      'b1_gonna_wanna',
      'Gonna e wanna',
      'Going to e want to na boca de um americano',
      40,
      theory({
        concept:
          'No inglês falado dos Estados Unidos, going to vira gonna quando a pessoa planeja ou prevê o futuro próximo. Want to vira wanna quando expressa vontade. Não é erro de quem “não sabe gramática”: é o ritmo real da conversa. Em texto formal você ainda escreve going to e want to. Na rua, na série e no áudio do iPhone, o que entra no ouvido é gonna e wanna.',
        culture:
          'Americanos usam gonna e wanna com amigos, família e até no trabalho informal. Num e-mail para o chefe, prefira I am going to e I would like to. O som junta as palavras: going to → gonna, want to → wanna, you → ya. Ouça devagar; a diferença está no ritmo, não numa palavra nova do dicionário.',
        examples: [
          {
            caption: 'Plano de verdade, não gramática de livro',
            english: "I'm gonna call you later.",
            translation: 'Eu vou te ligar mais tarde.',
          },
          {
            caption: 'Vontade no falado',
            english: 'Do you wanna grab coffee?',
            translation: 'Você quer pegar um café?',
          },
          {
            caption: 'You virando ya',
            english: 'See ya. I wanna go home.',
            translation: 'Até. Eu quero ir pra casa.',
          },
        ],
      }),
      [
        mcPt(
          'b1_q1',
          'O que “I’m gonna be late” quer dizer?',
          "I'm gonna be late.",
          ['Eu vou me atrasar.', 'Eu já me atrasei ontem.', 'Eu quero chegar cedo.', 'Eu não vou.'],
          'Eu vou me atrasar.',
          'Gonna carrega futuro próximo. I’m gonna be late = vou me atrasar, aviso agora.',
          'Não é passado. Gonna aponta para o que vem aí: vou me atrasar.',
        ),
        mcEn(
          'b1_q2',
          'Como um americano fala “você quer ir” na conversa?',
          'Do you wanna go?',
          ['Do you wanna go?', 'Do you going to go?', 'Want you go?', 'You will to go?'],
          'Do you wanna go?',
          'Want to vira wanna. A pergunta natural é Do you wanna go?',
          'As outras copiam português. O falado americano é Do you wanna go?',
        ),
        fill(
          'b1_q3',
          'Complete com a redução: I _____ text you when I get there. (going to)',
          "I'm gonna text you when I get there.",
          ['gonna', "I'm gonna", 'im gonna', 'I am gonna'],
          'Going to reduz para gonna. I’m gonna text you when I get there é o que se ouve.',
          'A peça que falta no falado é gonna, não will to nem going.',
        ),
        order(
          'b1_q4',
          'Monte a frase falada na ordem que um americano diria.',
          "I wanna see that movie.",
          ['I', 'wanna', 'see', 'that', 'movie'],
          'A ordem nativa é I wanna see that movie — sujeito, wanna, verbo, objeto.',
          'Wanna fica no lugar de want to, antes do verbo. Não quebre a ordem.',
        ),
        mcPt(
          'b1_q5',
          'Quando gonna soa natural?',
          "We're gonna eat soon.",
          [
            'Combinando um plano próximo, na fala.',
            'Só em redação da faculdade.',
            'Nunca, porque é erro.',
            'Apenas em inglês britânico formal.',
          ],
          'Combinando um plano próximo, na fala.',
          'We’re gonna eat soon é plano informal. Em redação acadêmica, escreva we are going to.',
          'Gonna não é erro na conversa americana. É o som de going to no dia a dia.',
        ),
      ],
    ),
    lesson(
      'b2_whatcha',
      "Whatcha doin'",
      'What are you doing vira uma só peça na fala',
      40,
      theory({
        concept:
          'What are you doing? é a forma completa. No falado rápido dos EUA isso cola: what are you → whatcha, doing → doin’. A pergunta inteira vira Whatcha doin’? O significado não muda: “o que você está fazendo (agora)?”. You doing também aparece como ya doin’. O ouvido precisa reconhecer o bloco, não cada palavra isolada.',
        culture:
          'Whatcha é marca de conversa casual — mensagem, ligação, encontro. Com um desconhecido em entrevista, use What are you doing? ou How are you? Whatcha doing tonight? é convite leve. O apóstrofo em doin’ marca o g que some: doing → doin’. Não é preguiça; é o sotaque americano ligando as palavras.',
        examples: [
          {
            caption: 'Pergunta clássica de mensagem',
            english: "Whatcha doin'?",
            translation: 'Tá fazendo o quê?',
          },
          {
            caption: 'Com tempo: hoje à noite',
            english: 'Whatcha doing tonight?',
            translation: 'O que você vai fazer hoje à noite?',
          },
          {
            caption: 'What are you → whatcha em outra pergunta',
            english: 'Whatcha talking about?',
            translation: 'Do que você está falando?',
          },
        ],
      }),
      [
        mcPt(
          'b2_q1',
          'Whatcha doin’? pergunta o quê?',
          "Whatcha doin'?",
          ['O que você está fazendo?', 'Onde você está?', 'Qual é o seu nome?', 'Quanto custa?'],
          'O que você está fazendo?',
          'Whatcha doin’ comprime What are you doing? O sentido é “tá fazendo o quê?”.',
          'Não pergunta lugar nem nome. É what are you doing, só que colado.',
        ),
        mcEn(
          'b2_q2',
          'Qual soa mais falada nos EUA?',
          "Whatcha doin' right now?",
          [
            "Whatcha doin' right now?",
            'What do you doing right now?',
            'What you is doing now?',
            'You doing what now are?',
          ],
          "Whatcha doin' right now?",
          'A redução nativa é Whatcha doin’ right now? What do you doing mistura os tempos.',
          'O bloco certo é whatcha + doin’. As outras quebram a gramática e o som.',
        ),
        fill(
          'b2_q3',
          'Escreva a redução de “What are you”: _____ talking about?',
          'Whatcha talking about?',
          ['whatcha', 'watcha', 'what you'],
          'What are you cola em whatcha. Whatcha talking about? = do que você está falando?',
          'A peça falada é whatcha, não what are you por extenso nesta lição.',
        ),
        order(
          'b2_q4',
          'Ordene a pergunta casual sobre hoje à noite.',
          'Whatcha doing tonight?',
          ['Whatcha', 'doing', 'tonight'],
          'Whatcha doing tonight? é o convite leve. Tonight fecha a pergunta.',
          'Comece com Whatcha, depois doing, depois tonight.',
        ),
        mcPt(
          'b2_q5',
          'Por que o g some em doin’?',
          "What are you doin'?",
          [
            'No falado americano, -ing muitas vezes vira -in’.',
            'Porque doing está errado em qualquer contexto.',
            'Porque é inglês antigo da rainha.',
            'Porque o n some, não o g.',
          ],
          'No falado americano, -ing muitas vezes vira -in’.',
          'Going, doing, talking perdem o g no falado: goin’, doin’, talkin’. A escrita formal mantém -ing.',
          'Não é erro absoluto. É pronúncia casual americana de -ing.',
        ),
      ],
    ),
    lesson(
      'b3_greetings',
      'Oi americano',
      'Hey, what’s up, you guys — e como responder',
      40,
      theory({
        concept:
          'Nos EUA o oi mais comum entre conhecidos não é How do you do. É Hey, Hi, What’s up? e You guys. What’s up? raramente pede um relatório da sua vida: a resposta padrão é Not much, Hey, ou I’m good. You guys serve para um grupo misto; não é só “vocês homens”. How are you? ainda existe, um pouco mais educado, e a resposta curta é I’m good, thanks.',
        culture:
          'Na Califórnia, no Texas ou em Nova York, Hey é o padrão. Good morning aparece em loja e recepção. What’s up? dito rápido vira wassup / wassup. Responder com um discurso longo soa estranho. You guys no Sul também vira y’all — nesta trilha ficamos no you guys nacional. Evite traduzir “e aí, beleza?” palavra por palavra.',
        examples: [
          {
            caption: 'Abertura padrão',
            english: "Hey, what's up?",
            translation: 'Oi, e aí?',
          },
          {
            caption: 'Resposta curta e natural',
            english: 'Not much. How about you?',
            translation: 'Nada demais. E você?',
          },
          {
            caption: 'Falar com o grupo',
            english: 'Are you guys ready?',
            translation: 'Vocês estão prontos?',
          },
        ],
      }),
      [
        mcPt(
          'b3_q1',
          'Qual é a resposta mais natural a “What’s up?” entre amigos?',
          "What's up?",
          ['Not much.', 'I am very well, I thank you.', 'Yes, I am up.', 'Nothing the floor.'],
          'Not much.',
          'What’s up? pede um aceno, não um boletim. Not much ou Hey já resolvem.',
          'I am very well soa de livro. O falado curto é Not much.',
        ),
        mcEn(
          'b3_q2',
          'Como chamar o grupo todo de forma americana?',
          'You guys coming?',
          ['You guys coming?', 'You peoples coming?', 'Yous coming all?', 'The guys only men coming?'],
          'You guys coming?',
          'You guys vale para o grupo, misto ou não. You guys coming? é o convite.',
          'You peoples não existe. O plural informal nacional é you guys.',
        ),
        fill(
          'b3_q3',
          'Complete a saudação: Hey, _____ up?',
          "Hey, what's up?",
          ["what's", 'whats', "what's up", 'whats up'],
          "A peça clássica é what's. Hey, what's up? é o oi mais ouvido.",
          "Falta what's. A saudação completa é Hey, what's up?",
        ),
        order(
          'b3_q4',
          'Monte a resposta curta americana.',
          "I'm good, thanks.",
          ["I'm", 'good,', 'thanks.'],
          "I'm good, thanks. é o How are you? do dia a dia — curto e suficiente.",
          "A ordem é I'm + good + thanks. Não calque 'estou bem obrigado' palavra a palavra além disso.",
        ),
        mcPt(
          'b3_q5',
          'You guys, neste curso, aponta para quem?',
          'Love you guys.',
          [
            'Um grupo de pessoas, não só homens.',
            'Apenas dois homens.',
            'Somente a família real.',
            'Ninguém: a forma está errada.',
          ],
          'Um grupo de pessoas, não só homens.',
          'You guys é o vocês informal dos EUA, inclusive para grupos mistos. Love you guys = amo vocês.',
          'Não restrinja a homens. Nos EUA you guys é o grupo.',
        ),
      ],
    ),
    challenge(
      'b4_basico_desafio',
      'Desafio do Básico',
      'Gonna, wanna, whatcha e o oi americano no mesmo recado',
      80,
      theory({
        concept:
          'O desafio junta as reduções do Básico. Você vai ouvir gonna, wanna, whatcha e um cumprimento. Trate cada frase como áudio real: primeiro o som, depois o sentido. Se errar, leia o motivo e toque Ouvir Pronúncia Nativa de novo. Precisa de cerca de 75% para abrir o Intermediário (ou o teste de nivelamento já pode ter aberto).',
        culture:
          'Uma conversa americana de trinta segundos mistura tudo isso. Ninguém fala I am going to / What are you doing? o tempo todo com os amigos. O ouvido treinado pega o bloco e traduz o recado, não a palavra isolada.',
        examples: [
          {
            caption: 'Recado de mensagem',
            english: "Hey. Whatcha doin'? Wanna hang later? I'm gonna be downtown.",
            translation: 'Oi. Tá fazendo o quê? Quer sair mais tarde? Vou ficar no centro.',
          },
          {
            caption: 'Resposta possível',
            english: "Not much. Yeah, I'm down. See ya.",
            translation: 'Nada demais. Sim, topa. Até.',
          },
          {
            caption: 'Fechamento',
            english: "Cool. I'm gonna text you.",
            translation: 'Beleza. Vou te mandar mensagem.',
          },
        ],
      }),
      [
        mcEn(
          'b4_q1',
          'Qual mensagem está em inglês falado real?',
          "I'm gonna be late. Wanna wait?",
          [
            "I'm gonna be late. Wanna wait?",
            'I will to be late. Want you wait?',
            'I going be late. You want wait?',
            'Late I gonna. Wait wanna you?',
          ],
          "I'm gonna be late. Wanna wait?",
          'Gonna + wanna na mesma fala é exatamente o que se ouve. As outras são tradução dura.',
          'A nativa junta I’m gonna be late e Wanna wait? — duas reduções, uma mensagem.',
        ),
        mcPt(
          'b4_q2',
          'O que a pessoa quer saber?',
          "Whatcha doin' later?",
          [
            'O que você vai fazer mais tarde.',
            'Quanto você ganha.',
            'Onde você nasceu.',
            'Se você fala francês.',
          ],
          'O que você vai fazer mais tarde.',
          'Whatcha doin’ later? é o plano da tarde/noite, não dados pessoais.',
          'Later ancora a pergunta no futuro próximo. É “o que você vai fazer”.',
        ),
        fill(
          'b4_q3',
          'Complete: See ____. I wanna go. (you reduzido)',
          'See ya. I wanna go.',
          ['ya', 'ya.', 'you', 'u'],
          'See ya é o até informal. You reduz para ya no fechamento.',
          'O fechamento falado é ya. See ya, não see your.',
        ),
        order(
          'b4_q4',
          'Ordene o recado completo.',
          "Hey, I'm gonna call you.",
          ['Hey,', "I'm", 'gonna', 'call', 'you.'],
          'Hey abre. I’m gonna call you é o aviso. Essa é a ordem nativa.',
          'Não jogue gonna para o fim. Sujeito + gonna + verbo.',
        ),
        mcPt(
          'b4_q5',
          'I’m down, como resposta a um convite, significa:',
          "Yeah, I'm down.",
          ['Eu topo.', 'Eu caí no chão.', 'Eu estou triste.', 'Eu recuso.'],
          'Eu topo.',
          'I’m down = aceito, topo. Não é humor baixo nem queda literal neste contexto.',
          'Na conversa de planos, down é sim. Yeah, I’m down fecha o combinado.',
        ),
      ],
    ),
  ],
}
