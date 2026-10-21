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

export const intermediario: Level = {
  id: 'intermediario',
  order: 2,
  band: 'Intermediário',
  title: 'Ritmo da conversa',
  description:
    'Gotta, shoulda, phrasal verbs do dia (hang out, figure out, pick up) e respostas tipo no worries e you bet.',
  unlocksAt: 'intermediario',
  units: [
    lesson(
      'i1_gotta_shoulda',
      'Gotta, shoulda, coulda',
      'Have got to e os arrependimentos da fala',
      50,
      theory({
        concept:
          'Gotta vem de have got to / got to: necessidade agora. I gotta go = preciso ir. Shoulda, coulda, woulda vêm de should have, could have, would have — quase sempre no passado, muitas vezes com culpa leve: I shoulda called. Wanna e gonna você já viu; gotta entra na mesma família de reduções. Have to também existe, um pouco mais “limpo”; gotta é o que estoura no áudio americano.',
        culture:
          'I gotta run é a despedida educada em festa e no escritório informal. Shoulda woulda coulda vira até uma expressão pronta: “já era, não adianta reviver”. Não use gotta em redação acadêmica. Em mensagem para amigo, I gotta ask you something é perfeito. Ouça o t de gotta: soa como godda, não como duas palavras got to.',
        examples: [
          {
            caption: 'Sair com pressa',
            english: 'I gotta go. Text me later.',
            translation: 'Eu preciso ir. Me manda mensagem depois.',
          },
          {
            caption: 'Arrependimento leve',
            english: 'I shoulda left earlier.',
            translation: 'Eu deveria ter saído mais cedo.',
          },
          {
            caption: 'Possibilidade perdida',
            english: 'We coulda taken a cab.',
            translation: 'A gente poderia ter pego um táxi.',
          },
        ],
      }),
      [
        mcPt(
          'i1_q1',
          'I gotta run, na despedida, significa:',
          'I gotta run.',
          ['Preciso ir embora agora.', 'Vou correr na rua literalmente.', 'Já cheguei.', 'Não quero ir.'],
          'Preciso ir embora agora.',
          'Run aqui é sair, não maratona. I gotta run = preciso ir, despedida rápida.',
          'Não é esporte. Gotta run é o “tenho que ir” americano.',
        ),
        mcEn(
          'i1_q2',
          'Qual frase usa o should have reduzido?',
          'I shoulda called you.',
          ['I shoulda called you.', 'I should to called you.', 'I should calling you.', 'I gotta should you.'],
          'I shoulda called you.',
          'Should have → shoulda. I shoulda called you admite que a ligação não rolou.',
          'Should to não existe. A redução nativa é shoulda.',
        ),
        fill(
          'i1_q3',
          'Complete: I _____ go. (necessidade agora, de have got to)',
          'I gotta go.',
          ['gotta', 'I gotta', 'got to', 'have gotta'],
          'Have got to vira gotta. I gotta go é a forma que o ouvido americano espera.',
          'A peça é gotta. Got to por extenso também passa, mas a lição treina gotta.',
        ),
        order(
          'i1_q4',
          'Monte o arrependimento falado.',
          'I shoulda texted you.',
          ['I', 'shoulda', 'texted', 'you.'],
          'Sujeito + shoulda + particípio. I shoulda texted you.',
          'Shoulda vem antes do verbo no particípio, não no fim.',
        ),
        mcPt(
          'i1_q5',
          'Coulda aponta para o quê?',
          'I coulda helped.',
          [
            'Uma possibilidade no passado que não aconteceu.',
            'Uma ordem no futuro.',
            'Um convite para agora.',
            'Um nome próprio.',
          ],
          'Uma possibilidade no passado que não aconteceu.',
          'Could have → coulda. I coulda helped = eu poderia ter ajudado, e não ajudei.',
          'Não é futuro. Coulda olha para o passado que escapou.',
        ),
      ],
    ),
    lesson(
      'i2_phrasal_daily',
      'Phrasal verbs do dia',
      'Hang out, figure out, pick up, drop off, get up',
      50,
      theory({
        concept:
          'Phrasal verb é verbo + partícula com sentido novo. Hang out não é pendurar: é passar tempo. Figure out é descobrir, resolver. Pick up pode ser buscar alguém, aprender rápido ou atender o telefone — o contexto decide. Drop off é deixar alguém/algo em um lugar. Get up é levantar da cama. No falado, eles vêm com wanna/gonna: Wanna hang out? I’m gonna figure it out.',
        culture:
          'Americanos preferem phrasal verbs no papo e verbos “latinos” no texto formal (investigate em vez de figure out, in a report). Hang out é o convite padrão da adolescência até os trinta. Pick you up at 7 = eu te busco às 7, de carro. Se você traduzir palavra por palavra, hang out vira “pendurar fora” e a conversa morre. Ouça o bloco.',
        examples: [
          {
            caption: 'Convite',
            english: 'Wanna hang out this weekend?',
            translation: 'Quer sair / passar um tempo neste fim de semana?',
          },
          {
            caption: 'Resolver',
            english: "I'll figure it out. Don't worry.",
            translation: 'Eu resolvo. Não se preocupa.',
          },
          {
            caption: 'Buscar de carro',
            english: "I'm gonna pick you up at seven.",
            translation: 'Eu vou te buscar às sete.',
          },
        ],
      }),
      [
        mcPt(
          'i2_q1',
          'Hang out, num convite, significa:',
          'Wanna hang out?',
          ['Passar tempo juntos.', 'Desligar o telefone.', 'Pendurar casaco.', 'Trabalhar extra.'],
          'Passar tempo juntos.',
          'Hang out = ficar junto, sair sem cerimônia. Hang up é desligar.',
          'Não misture com hang up. Hang out é o convite social.',
        ),
        mcEn(
          'i2_q2',
          'Qual frase pede para buscar alguém de carro?',
          'Can you pick me up?',
          ['Can you pick me up?', 'Can you pick me off?', 'Can you hang me up?', 'Can you drop me in?'],
          'Can you pick me up?',
          'Pick someone up = buscar. Drop off é o contrário: deixar no lugar.',
          'A pergunta nativa é Can you pick me up? Pick off não é esse sentido.',
        ),
        fill(
          'i2_q3',
          'Complete: I’ll _____ it out. (descobrir / resolver)',
          "I'll figure it out.",
          ['figure', 'figure it', "I'll figure"],
          'Figure out = resolver. I’ll figure it out acalma quem está cobrando prazo.',
          'O verbo do bloco é figure. Figure out, não find out neste item (embora find out exista).',
        ),
        order(
          'i2_q4',
          'Monte o convite com hang out.',
          'Wanna hang out later?',
          ['Wanna', 'hang', 'out', 'later?'],
          'Wanna hang out later? partícula out cola em hang. Later fecha o quando.',
          'Hang e out ficam juntos. Não separe com later no meio.',
        ),
        mcPt(
          'i2_q5',
          'Drop off, com uma pessoa no carro, é:',
          "I'll drop you off at work.",
          [
            'Deixar você no trabalho.',
            'Buscar você no trabalho.',
            'Demitir você.',
            'Ligar para o trabalho.',
          ],
          'Deixar você no trabalho.',
          'Drop someone off = deixar no destino. Pick up busca; drop off entrega.',
          'Não é buscar. I’ll drop you off at work = eu te deixo no trabalho.',
        ),
      ],
    ),
    lesson(
      'i3_replies',
      'Respostas curtas',
      'No worries, you bet, my bad, I’m down, for sure',
      50,
      theory({
        concept:
          'O inglês americano vive de respostas de duas palavras. No worries e you bet substituem you’re welcome. My bad admite culpa pequena sem discurso. I’m down aceita o plano. For sure confirma. Sounds good fecha um combinado. Elas soam frias se você espera o “de nada” comprido do português formal — nos EUA, curto é educado entre pares.',
        culture:
          'You bet é energético, meio Midwest e West Coast. No worries atravessou do australiano para o americano e ficou. My bad nasceu no basquete e foi para a fala geral. For sure pode ser só “sim”. Cuidado: whatever como resposta soa rude (tanto faz, estou pouco ligando). Prefira sounds good quando o plano está ok.',
        examples: [
          {
            caption: 'Depois de um thanks',
            english: 'No worries.',
            translation: 'Tranquilo. / De nada.',
          },
          {
            caption: 'Confirmação forte',
            english: 'You bet. I’ll be there.',
            translation: 'Pode crer. Eu vou estar lá.',
          },
          {
            caption: 'Culpa leve',
            english: 'My bad. I got the time wrong.',
            translation: 'Foi mal. Eu errei o horário.',
          },
        ],
      }),
      [
        mcPt(
          'i3_q1',
          'No worries depois de “thanks” equivale a:',
          'No worries.',
          ['De nada, fica tranquilo.', 'Estou muito preocupado.', 'Não, obrigado.', 'Nunca mais.'],
          'De nada, fica tranquilo.',
          'No worries desfaz o peso do favor. É you’re welcome informal.',
          'Não é preocupação real. É o de nada americano.',
        ),
        mcEn(
          'i3_q2',
          'Qual resposta aceita o convite?',
          "I'm down.",
          ["I'm down.", "I'm up the plan.", "I'm bad.", "I'm worry."],
          "I'm down.",
          'I’m down = topo. I’m up sozinho não carrega esse sentido de convite.',
          'A nativa é I’m down. My bad é desculpa, não aceitação.',
        ),
        fill(
          'i3_q3',
          'Admita o erro pequeno em duas palavras: _____ bad.',
          'My bad.',
          ['My', 'my bad', 'My bad'],
          'My bad é a desculpa curta. Não precisa de I am very sorry neste tom.',
          'A peça é My. My bad, não Your bad neste uso.',
        ),
        order(
          'i3_q4',
          'Monte a confirmação do plano.',
          'For sure. Sounds good.',
          ['For', 'sure.', 'Sounds', 'good.'],
          'For sure confirma. Sounds good fecha. Dois blocos americanos seguidos.',
          'For sure fica junto. Sounds good é a segunda batida.',
        ),
        mcPt(
          'i3_q5',
          'You bet, respondendo a um pedido, é:',
          'You bet.',
          ['Claro, pode deixar.', 'Eu aposto dinheiro.', 'Eu recuso.', 'Eu não entendi.'],
          'Claro, pode deixar.',
          'You bet = com certeza, pode contar comigo. Não é aposta literal aqui.',
          'O sentido conversacional é “claro”. A aposta real precisaria de contexto de jogo.',
        ),
      ],
    ),
    challenge(
      'i4_inter_desafio',
      'Desafio do Intermediário',
      'Reduções + phrasal verbs + respostas curtas',
      90,
      theory({
        concept:
          'Aqui o áudio mistura gotta, hang out, pick up e no worries. É o recado que um americano manda no caminho do trabalho. Ouça cada frase com Ouvir Pronúncia Nativa antes de marcar. Cerca de 75% libera o Avançado, se o nivelamento ainda não tiver aberto esse patamar.',
        culture:
          'Mensagem típica: Gotta run. Wanna hang out Friday? I can pick you up. You bet. Se você traduzir peça por peça, perde o recado. Treine o bloco.',
        examples: [
          {
            caption: 'Mensagem no carro',
            english: "I gotta run. I'll pick you up at 7.",
            translation: 'Preciso ir. Eu te busco às 7.',
          },
          {
            caption: 'O outro lado',
            english: 'Sounds good. Thanks.',
            translation: 'Fechado. Valeu.',
          },
          {
            caption: 'Fechamento',
            english: 'No worries. See ya.',
            translation: 'Tranquilo. Até.',
          },
        ],
      }),
      [
        mcEn(
          'i4_q1',
          'Qual recado está nativo?',
          "I gotta figure it out. I'll pick you up.",
          [
            "I gotta figure it out. I'll pick you up.",
            'I must to figure. I catch you up the car.',
            'I gotta figure off. I drop you on.',
            'I shoulda pick hang out you.',
          ],
          "I gotta figure it out. I'll pick you up.",
          'Gotta + figure it out + pick you up é uma sequência real de mensagem.',
          'As outras misturam partículas. Ouça a nativa completa.',
        ),
        mcPt(
          'i4_q2',
          'I’ll pick you up at 7 comunica:',
          "I'll pick you up at 7.",
          ['Eu te busco às 7.', 'Eu te deixo às 7.', 'Eu te ligo às 7.', 'Eu acordo às 7.'],
          'Eu te busco às 7.',
          'Pick up = buscar. Drop off seria deixar. O horário 7 âncora o combinado.',
          'Não é drop off. Pick you up é buscar, em geral de carro.',
        ),
        fill(
          'i4_q3',
          'Resposta curta a thanks: No _____.',
          'No worries.',
          ['worries', 'worry', 'No worries'],
          'No worries, no plural. É a peça pronta, não no worry.',
          'A palavra é worries. No worries fecha o thanks.',
        ),
        order(
          'i4_q4',
          'Monte o convite com hang out e wanna.',
          'Wanna hang out Friday?',
          ['Wanna', 'hang', 'out', 'Friday?'],
          'Wanna hang out Friday? é o fim de semana combinado em uma linha.',
          'Hang out fica colado. Friday é o quando.',
        ),
        mcPt(
          'i4_q5',
          'I shoulda texted you admite:',
          'I shoulda texted you.',
          [
            'Que a mensagem não foi enviada e agora pesa.',
            'Que a mensagem já foi enviada com sucesso.',
            'Um plano futuro de texto.',
            'Um convite para hang out agora.',
          ],
          'Que a mensagem não foi enviada e agora pesa.',
          'Shoulda + particípio = passado que não rolou. I shoulda texted you é desculpa.',
          'Não é futuro. Shoulda olha para o texto que não saiu.',
        ),
      ],
    ),
  ],
}
