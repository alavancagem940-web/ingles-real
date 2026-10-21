import { useEffect, useRef, useState } from 'react'
import {
  BAND_LABEL,
  BAND_UNLOCK_COPY,
  PLACEMENT_PASS,
  bandFromProgress,
  nextPlacementDifficulty,
  questionsForRound,
  type PlacementBand,
  type PlacementDifficulty,
  type PlacementQuestion,
} from '../lib/placement'
import { speak, unlockTts } from '../lib/tts'
import { Button } from './ui/button'
import { NativeListenButton } from './NativeListenButton'
import { PhraseBlock } from './PhraseBlock'
import { Progress } from './ui/progress'
import { cn } from '../lib/cn'

type PlacementScreenProps = {
  retake: boolean
  onFinished: (band: PlacementBand) => void
  onCancel?: () => void
}

export function PlacementScreen({ retake, onFinished, onCancel }: PlacementScreenProps) {
  const [difficulty, setDifficulty] = useState<PlacementDifficulty>('easy')
  const [index, setIndex] = useState(0)
  const correctRef = useRef(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [result, setResult] = useState<PlacementBand | null>(null)

  const round = questionsForRound(difficulty)
  const question = round[index]

  useEffect(() => {
    if (question && !result) speak(question.nativePhrase, 'native')
  }, [question, result])

  if (result) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Teste de nivelamento</p>
        <h1 className="mt-2 text-2xl font-extrabold text-white">Você está no patamar {BAND_LABEL[result]}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{BAND_UNLOCK_COPY[result]}</p>
        <p className="mt-3 text-sm text-muted">
          {retake
            ? 'O XP e as lições já feitas continuam neste aparelho. Só o patamar de desbloqueio foi atualizado.'
            : 'Quem já sabe não começa do zero: os módulos daquele patamar já abrem.'}
        </p>
        <Button className="mt-8" size="lg" onClick={() => onFinished(result)}>
          Ir para a trilha
        </Button>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="flex flex-1 items-center justify-center px-6">
        <p className="text-muted">Não foi possível carregar o teste.</p>
      </div>
    )
  }

  const progressValue = ((difficultyIndex(difficulty) * round.length + index) / 9) * 100

  function finishRound(finalCorrect: number) {
    const next = nextPlacementDifficulty(difficulty, finalCorrect)
    if (next === 'done') {
      setResult(bandFromProgress(difficulty, finalCorrect))
      return
    }
    setDifficulty(next)
    setIndex(0)
    correctRef.current = 0
    setSelected(null)
    setChecked(false)
    setLastCorrect(null)
  }

  function verify() {
    if (!selected || checked) return
    unlockTts()
    const ok = selected === question.answer
    setChecked(true)
    setLastCorrect(ok)
    correctRef.current += ok ? 1 : 0
    speak(question.nativePhrase, 'native')
  }

  function advance() {
    const nextIndex = index + 1
    if (nextIndex >= round.length) {
      finishRound(correctRef.current)
      return
    }
    setIndex(nextIndex)
    setSelected(null)
    setChecked(false)
    setLastCorrect(null)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Teste de nivelamento</p>
          {retake && onCancel ? (
            <button type="button" className="text-xs font-bold text-muted underline" onClick={onCancel}>
              Cancelar
            </button>
          ) : null}
        </div>
        <h1 className="mt-2 text-xl font-extrabold text-white">Perguntas progressivas</h1>
        <p className="mt-1 text-xs text-muted">
          Fácil → difícil. Acertar {PLACEMENT_PASS} de {round.length} neste bloco sobe o nível do teste.
        </p>
        <Progress className="mt-3" value={progressValue} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-4 pb-36">
        <p className="text-xs font-bold text-muted">
          Bloco {labelDifficulty(difficulty)} · pergunta {index + 1} de {round.length}
        </p>
        <h2 className="mt-2 text-lg font-extrabold leading-snug text-white">{question.prompt}</h2>
        <div className="mt-3">
          <PhraseBlock english={question.nativePhrase} />
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {question.choices.map((choice) => (
            <ChoiceRow
              key={choice}
              question={question}
              choice={choice}
              selected={selected === choice}
              checked={checked}
              lastCorrect={lastCorrect}
              onSelect={setSelected}
            />
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 border-t border-line/80 bg-ink/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        {!checked ? (
          <Button size="lg" disabled={!selected} onClick={verify}>
            Verificar
          </Button>
        ) : (
          <div className={cn('rounded-2xl p-4', lastCorrect ? 'bg-green-soft' : 'bg-red-soft')}>
            <p className={cn('font-extrabold', lastCorrect ? 'text-green' : 'text-red')}>
              {lastCorrect ? 'Correto' : 'Ainda não'}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">
              {lastCorrect ? question.explainCorrect : question.explainWrong}
            </p>
            <Button className="mt-3 w-full" onClick={advance}>
              Continuar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function ChoiceRow({
  question,
  choice,
  selected,
  checked,
  lastCorrect,
  onSelect,
}: {
  question: PlacementQuestion
  choice: string
  selected: boolean
  checked: boolean
  lastCorrect: boolean | null
  onSelect: (choice: string) => void
}) {
  const showGreen = checked && lastCorrect && choice === question.answer
  const showRed = checked && lastCorrect === false && choice === (selected ? choice : '') && selected
  return (
    <li className="flex flex-col gap-2">
      <button
        type="button"
        disabled={checked}
        onClick={() => {
          onSelect(choice)
          if (question.choicesAreEnglish) speak(choice, 'choice')
        }}
        className={cn(
          'w-full rounded-2xl border-2 px-4 py-3.5 text-left text-[0.95rem] font-bold leading-snug text-white touch-manipulation',
          showGreen && 'border-green bg-green text-[#102012]',
          showRed && 'border-red bg-red',
          !checked && selected && 'border-blue bg-[#1A3340]',
          !checked && !selected && 'border-line bg-card',
          checked && !showGreen && !showRed && 'border-line bg-card opacity-60',
        )}
      >
        {choice}
      </button>
      {question.choicesAreEnglish ? <NativeListenButton phrase={choice} /> : null}
    </li>
  )
}

function difficultyIndex(difficulty: PlacementDifficulty): number {
  if (difficulty === 'easy') return 0
  if (difficulty === 'medium') return 1
  return 2
}

function labelDifficulty(difficulty: PlacementDifficulty): string {
  if (difficulty === 'easy') return 'fácil'
  if (difficulty === 'medium') return 'médio'
  return 'difícil'
}
