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

export const BAND_LABEL: Record<PlacementBand, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export const BAND_UNLOCK_COPY: Record<PlacementBand, string> = {
  iniciante:
    'A primeira bolinha é o Básico. A trilha segue em frente, e cada lição pede cerca de 75% para abrir a próxima.',
  intermediario:
    'A primeira bolinha já ensina o Intermediário. O Básico não abre para revisar. A trilha segue para o que é mais difícil.',
  avancado:
    'A primeira bolinha já ensina o Avançado. O Básico e o Intermediário ficam fora do caminho. A trilha segue para coisas mais difíceis.',
}
