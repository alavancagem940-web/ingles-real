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

export const fluencia: Level = {
  id: 'fluencia',
  order: 4,
  band: 'Fluência',
  title: 'Ouvido nativo',
  description:
    'Didja, dontcha, lemme, gimme, registro formal vs falado, e marcadores like / you know / I mean — sem virar muletário.',
  unlocksAt: 'avancado',
  units: [
    lesson(
      'f1_reductions_native',
      'Didja, lemme, gimme',
      'O inglês que some nas emendas',
      70,
      theory({
        concept:
          'Na fala rápida, did you vira didja, don’t you vira dontcha, let me vira lemme, give me vira gimme, going to / want to / got to você já treinou. What do you vira whaddya. How do you vira howdya. Ninguém escreve didja numa redação; todo mundo ouve didja no podcast. O treino de fluência é reconhecer a emenda e devolver a forma completa na cabeça, sem travar a conversa.',
        culture:
          'Didja eat yet? é o “já comeu?” americano. Lemme see é o gesto de pegar o celular da sua mão, educado entre amigos. Gimme a sec = me dá um segundo. Em entrevista, volte para did you / let me / give me. Ouça o palato: didja tem um d+y virando j, o mesmo caminho de would you → wouldja. Jenny neste app lê um pouco lenta de propósito, para você cravar o som antes de acelerar no mundo real.',
        examples: [
          {
            caption: 'Pergunta do almoço',
            english: 'Didja eat yet?',
            translation: 'Você já comeu?',
          },
          {
            caption: 'Pedido de um segundo',
            english: 'Lemme see. Gimme a sec.',
            translation: 'Deixa eu ver. Me dá um segundo.',
          },
          {
            caption: 'Don’t you',
            english: "Dontcha wanna come with us?",
            translation: 'Você não quer vir com a gente?',
          },
        ],
      }),
      [
        mcPt(
          'f1_q1',
          'Didja eat yet? pergunta:',
          'Didja eat yet?',
          ['Se você já comeu.', 'Se você vai cozinhar.', 'O preço do prato.', 'Se a comida está boa.'],
          'Se você já comeu.',
          'Did you → didja. Yet ainda: já comeu (até agora)?',
          'Não é cardápio. Didja eat yet? é o check de refeição.',
        ),
        mcEn(
          'f1_q2',
          'Qual é a redução de let me?',
          'Lemme help you.',
          ['Lemme help you.', 'Letme to help you.', 'Let’s me help you.', 'Lend me help you.'],
          'Lemme help you.',
          'Let me → lemme. Lemme help you é oferta rápida, não let’s.',
          'Let’s muda o sujeito para we. A nativa aqui é lemme.',
        ),
        fill(
          'f1_q3',
          'Give me reduzido: _____ a minute.',
          'Gimme a minute.',
          ['Gimme', 'gimme', 'give me', 'gimmie'],
          'Give me → gimme. Gimme a minute = me dá um minuto.',
          'A redução é gimme. Gimmie com i extra também aparece, mas a lição usa gimme.',
        ),
        order(
          'f1_q4',
          'Monte a pergunta com dontcha.',
          "Dontcha wanna come?",
          ['Dontcha', 'wanna', 'come?'],
          'Dontcha wanna come? empilha don’t you + want to. Dois cortes, uma pergunta.',
          'Dontcha abre. Wanna fica no meio. Come fecha.',
        ),
        mcPt(
          'f1_q5',
          'Whaddya think? é a emenda de:',
          'Whaddya think?',
          ['What do you think?', 'What did they think?', 'Why do we think?', 'Where have you think?'],
          'What do you think?',
          'What do you → whaddya. Whaddya think? pede opinião agora.',
          'Não é passado did. É what do you, colado.',
        ),
      ],
    ),
    lesson(
      'f2_register',
      'Registro: rua vs e-mail',
      'Wanna no sofá, would like no trabalho',
      70,
      theory({
        concept:
          'Fluência não é falar gonna o tempo todo. É escolher o registro. Com amigo: Wanna grab lunch? Com cliente: Would you like to grab lunch, ou Are you available for lunch? Going to escrito; gonna falado. Guys no grupo de amigos; everyone / all no slide. I gotta run no corredor; I need to head out na reunião. O erro do avançado é usar gíria no lugar errado, ou formalidade de livro no bar.',
        culture:
          'Americanos mudam de registro no mesmo dia sem anunciar. Slack interno tolera gonna. E-mail para o vice-presidente não. You guys numa sala só de mulheres ainda é comum e, em algumas empresas, já se prefere folks ou everyone. Esta lição não moraliza: mostra o par falado/formal para você ouvir os dois e escolher. Ouça os dois tons na Jenny, lenta, e note que a gramática por baixo é a mesma.',
        examples: [
          {
            caption: 'Sofá',
            english: 'Wanna grab lunch?',
            translation: 'Quer pegar um almoço?',
          },
          {
            caption: 'Cliente',
            english: 'Would you like to get lunch tomorrow?',
            translation: 'Você gostaria de almoçar amanhã?',
          },
          {
            caption: 'Sair da reunião',
            english: 'I need to head out. Thanks, everyone.',
            translation: 'Preciso ir. Obrigado, pessoal.',
          },
        ],
      }),
      [
        mcPt(
          'f2_q1',
          'Wanna grab lunch? serve melhor para:',
          'Wanna grab lunch?',
          [
            'Amigo ou colega próximo.',
            'Carta para um juiz.',
            'Abstract de artigo científico.',
            'Juramento de posse.',
          ],
          'Amigo ou colega próximo.',
          'Wanna + grab é registro informal. Com juiz, would you like / would it be possible.',
          'Não leve wanna para o tribunal. O par formal está na teoria.',
        ),
        mcEn(
          'f2_q2',
          'Qual fecha uma reunião com registro mais limpo?',
          'I need to head out. Thanks, everyone.',
          [
            'I need to head out. Thanks, everyone.',
            'I gotta bounce dudes no cap.',
            'Wanna I going now guys cake.',
            'I run gotta you bet ice.',
          ],
          'I need to head out. Thanks, everyone.',
          'Head out é sair sem gíria pesada. Everyone cobre o grupo no trabalho.',
          'I gotta bounce pode ser ok no grupo íntimo, não no slide da diretoria.',
        ),
        fill(
          'f2_q3',
          'Par formal de wanna: Would you _____ to…',
          'Would you like to…',
          ['like', 'like to', 'Would you like'],
          'Would you like to é o want to do e-mail. Mesma vontade, outro paletó.',
          'A peça é like. Would you like to, não would you wanna to.',
        ),
        order(
          'f2_q4',
          'Monte o convite formal.',
          'Would you like to join us?',
          ['Would', 'you', 'like', 'to', 'join', 'us?'],
          'Would you like to join us? é o Wanna come? de reunião.',
          'Would you like to fica nesta ordem. Join us é o verbo principal.',
        ),
        mcPt(
          'f2_q5',
          'I gotta bounce, entre amigos, significa:',
          'I gotta bounce.',
          ['Preciso ir embora.', 'Preciso pular num trampolim.', 'Vou dançar.', 'Vou pagar a conta só eu.'],
          'Preciso ir embora.',
          'Bounce = sair, ir embora, gíria. I gotta bounce é o I gotta run ainda mais solto.',
          'Não é ginástica. Bounce neste registro é saída.',
        ),
      ],
    ),
    lesson(
      'f3_fillers',
      'Like, you know, I mean',
      'Marcadores reais — sem virar muletário',
      70,
      theory({
        concept:
          'Americanos enchem a fala com like, you know, I mean, actually, so. Eles não são o conteúdo: são tempo para pensar e sinal de “estamos na mesma conversa”. Like comparativo (like a brother) é outra peça. Like marcador (I was like, wait) introduz fala ou reação. Fluência é entender o marcador e não copiar dez likes por frase. Actually corrige com suavidade. I mean reformula. You know pede cumplicidade, não uma aula.',
        culture:
          'Séries exageram o like californiano. No Midwest aparece you know. I mean é nacional. O risco para o aprendiz é soar inseguro ou adolescente se o like tomar o lugar de cada pausa. Use a pausa de verdade — neste app a Jenny já insere quebras — e um marcador só quando reformular. Never use fillers to flirt or fill silence with heat; they are thinking sounds, nothing else.',
        examples: [
          {
            caption: 'Reformular',
            english: "I mean, that's not what I meant.",
            translation: 'Digo, não foi isso que eu quis dizer.',
          },
          {
            caption: 'Cumplicidade',
            english: "It's kinda weird, you know?",
            translation: 'É meio estranho, sabe?',
          },
          {
            caption: 'Correção suave',
            english: 'Actually, we already booked it.',
            translation: 'Na verdade, a gente já reservou.',
          },
        ],
      }),
      [
        mcPt(
          'f3_q1',
          'I mean, no começo da frase, costuma:',
          "I mean, we can try tomorrow.",
          [
            'Reformular ou suavizar o que veio antes.',
            'Pedir o significado no dicionário.',
            'Ofender a pessoa.',
            'Marcar um encontro romântico.',
          ],
          'Reformular ou suavizar o que veio antes.',
          'I mean é “quer dizer”. Empurra a frase para uma versão mais clara.',
          'Não é flerte e não pede definição. É marcador de reformulação.',
        ),
        mcEn(
          'f3_q2',
          'Qual usa you know como marcador, não como pergunta real de saber?',
          "It's tough, you know?",
          [
            "It's tough, you know?",
            'You know the capital of Ohio?',
            'Do you know how to swim?',
            'I know you know the password?',
          ],
          "It's tough, you know?",
          'No fim da frase, you know? pede cumplicidade. As outras perguntam informação de verdade.',
          'O marcador é It’s tough, you know? — não um quiz.',
        ),
        fill(
          'f3_q3',
          'Correção suave: _____, the meeting is at four. (actually)',
          'Actually, the meeting is at four.',
          ['Actually', 'actually', 'Actual'],
          'Actually corrige o dado sem esculachar. Actually, the meeting is at four.',
          'A peça é Actually. Actual sozinho é adjetivo, não o marcador.',
        ),
        order(
          'f3_q4',
          'Monte a reformulação.',
          "I mean, that's fine.",
          ['I', 'mean,', "that's", 'fine.'],
          'I mean abre a correção. That’s fine é o recado real.',
          'I mean fica na frente. That’s fine é o conteúdo.',
        ),
        mcPt(
          'f3_q5',
          'O like marcador em “I was like, no way” introduz:',
          'I was like, no way.',
          [
            'A reação ou fala da pessoa.',
            'Uma comparação com um irmão.',
            'Um pedido para curtir uma foto.',
            'Um verbo de amar.',
          ],
          'A reação ou fala da pessoa.',
          'Be like introduz quote/reação: I was like, no way = eu fiz “nem ferrando”.',
          'Não é curtir foto e não é like a brother. É o quote falado.',
        ),
      ],
    ),
    challenge(
      'f4_fluencia_desafio',
      'Desafio da Fluência',
      'Emendas, registro e marcadores no mesmo áudio',
      120,
      theory({
        concept:
          'Último desafio: didja, lemme, um par formal e um marcador. Se você acerta aqui, o ouvido já segura conversa americana real — ainda que a Jenny continue um pouco lenta de propósito, para treino. Cerca de 75% fecha a trilha. Você pode refazer o nivelamento sem apagar XP.',
        culture:
          'A vida real não separa as lições. Uma ligação de dois minutos tem didja, actually, I gotta, thanks everyone. O diploma desta trilha é reconhecer o bloco e responder no tom certo, não recitar regra.',
        examples: [
          {
            caption: 'Ligação rápida',
            english: 'Didja get my text? Lemme know.',
            translation: 'Você pegou minha mensagem? Me avisa.',
          },
          {
            caption: 'Correção',
            english: 'Actually, I meant Friday.',
            translation: 'Na verdade, eu quis dizer sexta.',
          },
          {
            caption: 'Saída limpa',
            english: 'I need to head out. Thanks, everyone.',
            translation: 'Preciso ir. Obrigado, pessoal.',
          },
        ],
      }),
      [
        mcEn(
          'f4_q1',
          'Qual linha está em fala nativa de ligação?',
          'Didja get it? Lemme know.',
          [
            'Didja get it? Lemme know.',
            'Did you it get? Let I know.',
            'Do you did get? Give I know.',
            'Whatcha get did? Wanna know me.',
          ],
          'Didja get it? Lemme know.',
          'Didja + lemme know é o recado curto de quem já se conhece.',
          'A nativa empilha duas reduções. Ouça de novo se precisar.',
        ),
        mcPt(
          'f4_q2',
          'Would you like to join us? é o par de qual fala de sofá?',
          'Would you like to join us?',
          ['Wanna come with us?', 'Gimme a sec.', 'No cap.', 'I gotta bounce, dude.'],
          'Wanna come with us?',
          'Mesmo convite, outro paletó. Join us / come with us. Would you like to vs wanna.',
          'Gimme a sec pede tempo, não é o par formal deste convite.',
        ),
        fill(
          'f4_q3',
          'Give me um segundo, reduzido: _____ a sec.',
          'Gimme a sec.',
          ['Gimme', 'gimme', 'Give me'],
          'Gimme a sec é o “um instante” americano. Sec = second.',
          'A redução é gimme. A sec é o tempo pedido.',
        ),
        order(
          'f4_q4',
          'Monte a correção com actually.',
          'Actually, I meant Friday.',
          ['Actually,', 'I', 'meant', 'Friday.'],
          'Actually abre a correção. I meant Friday é o conteúdo novo.',
          'Meant é o passado de mean. Friday é o dado corrigido.',
        ),
        mcPt(
          'f4_q5',
          'I mean, that’s fine, depois de uma ressalva, faz o quê?',
          "I mean, that's fine.",
          [
            'Suaviza e aceita, reenquadrando a fala.',
            'Marca um encontro íntimo.',
            'Pede o dicionário.',
            'Encerra o emprego da outra pessoa.',
          ],
          'Suaviza e aceita, reenquadrando a fala.',
          'I mean + that’s fine = quer dizer, está ok. Marcador + conteúdo.',
          'Não é flerte e não é demissão. É reformulação educada.',
        ),
      ],
    ),
  ],
}
