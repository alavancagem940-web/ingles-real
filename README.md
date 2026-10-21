# Inglês Real

PWA para aprender **inglês falado nos EUA**, do Básico à Fluência. Interface em português; as frases que você ouve são inglês nativo (Jenny neural). Feito para o iPhone (Safari → Tela de Início) e para o Android (Chrome → Instalar app).

Este repositório é o **site**. O aplicativo de desktop em Python (CustomTkinter + `edge-tts`) mora num **repositório irmão** — não misture com o TrilhaPy (Python de programação) nem coloque inglês dentro daquele app.

## Abrir no celular

URL pública (GitHub Pages):

**https://alavancagem940-web.github.io/ingles-real/**

### iPhone (Safari)

1. Abra o link no **Safari** (não no Chrome).
2. Toque em **Compartilhar**.
3. Toque em **Adicionar à Tela de Início**.
4. Confirme o nome **Inglês Real**.
5. Abra o ícone. Se o iOS perguntar, escolha **Abrir como App Web**.

Atalho em tela cheia: [página de instalação](https://alavancagem940-web.github.io/ingles-real/instalar.html).

### Android (Chrome)

Abra o mesmo link no Chrome → menu → **Instalar app** ou **Adicionar à tela inicial**.

Sem conta, sem senha, sem nuvem. O progresso (XP, módulos, nível, respostas e posição na lição) fica no `localStorage` deste aparelho. Feche e reabra: continua de onde parou.

## O que o app faz

- **Primeira abertura:** teste de nivelamento progressivo (fácil → difícil). Resultado Iniciante, Intermediário ou Avançado destrava os módulos daquele patamar.
- **Dá para refazer o teste** sem apagar XP.
- Cada lição começa pela **Explicação Teórica Prática** (regra, contexto cultural, exemplos reais **com tradução**).
- Conteúdo: reduções (`gonna`, `wanna`, `whatcha`), gírias, idioms e phrasal verbs.
- Em **toda frase em inglês** há o botão **Ouvir Pronúncia Nativa**.
- Voz: `en-US-JennyNeural` (fallback `en-US-AnaNeural`), MPEG no iPhone, ritmo ~-10% / 0.85, pitch suave. Sem flerte.

## Rodar na máquina

Node 22+ e npm:

```bash
npm install
npm test
npm run dev
```

O servidor sobe em [http://127.0.0.1:43921](http://127.0.0.1:43921).

```bash
npm run build      # gera dist/ (inclui os MP3 neurais)
npm run preview    # serve o build na mesma porta
```

Para publicar no GitHub Pages, o workflow em `.github/workflows/github-pages.yml` define `VITE_BASE` sozinho (`/ingles-real/` neste repo). Depois de uma atualização, feche o PWA na tela inicial e abra de novo para o iPhone pegar o service worker novo (`ingles-real-jenny-v1`).

## Pastas

- `src/lib/placement.ts` — teste de nivelamento
- `src/lib/curriculum/` — Básico → Fluência
- `src/lib/progress.ts` — XP e `localStorage`
- `src/lib/tts.ts` / `microsoft-neural.ts` — Jenny MPEG
- `src/components/` — telas (home, teoria, lição, nivelamento)

## Fora deste recorte

- Login, nuvem, contas
- Empilhar inglês dentro do TrilhaPy
- Clone de dubladora
