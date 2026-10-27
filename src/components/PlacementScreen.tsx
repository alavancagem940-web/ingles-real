import { useEffect, useRef, useState } from 'react'
import { BAND_LABEL, BAND_UNLOCK_COPY, type PlacementBand, type PlacementDifficulty, type PlacementQuestion } from '../lib/placement'
import { PLACEMENT_COUNT, PLACEMENT_PREP_MS, bandFromAnswers, generatePlacement } from '../lib/placement-generate'
import { shuffledChoices } from '../lib/shuffle'
import { speak, unlockTts } from '../lib/tts'
import { ExplanationBlock, playExplanation } from './ExplanationBlock'
import { Button } from './ui/button'
import { ExplainListenButton } from './ExplainListenButton'
import { GlossaryText } from './GlossaryNote'
import { NativeListenButton } from './NativeListenButton'
import { PhraseBlock } from './PhraseBlock'
import { Progress } from './ui/progress'
import { cn } from '../lib/cn'

type PlacementScreenProps = {
  retake: boolean
  seenTerms: readonly string[]
  onSeenTerm: (id: string) => void
  onFinished: (band: PlacementBand) => void
  onCancel?: () => void
}

export function PlacementScreen({ retake, seenTerms, onSeenTerm, onFinished, onCancel }: PlacementScreenProps) {
  const [quiz] = useState<PlacementQuestion[]>(() => generatePlacement())
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const answersRef = useRef<boolean[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [result, setResult] = useState<PlacementBand | null>(null)
  const [choiceKey, setChoiceKey] = useState('')
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), PLACEMENT_PREP_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const question = quiz[index]
  if (question && choiceKey !== question.id) {
    setChoiceKey(question.id)
    setChoices(shuffledChoices(question.choices))
  }

  useEffect(() => {
    if (!ready || !question || result || question.choicesAreEnglish) return
    if (question.nativePhrase.trim() === question.answer.trim()) return
    if (question.choices.some((choice) => choice.trim() === question.nativePhrase.trim())) return
    speak(question.nativePhrase, 'native')
  }, [ready, question, result])

  if (result) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Teste de nivelamento</p>
        <h1 className="mt-2 text-2xl font-extrabold text-white">Você está no patamar {BAND_LABEL[result]}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{BAND_UNLOCK_COPY[result]}</p>
        <p className="mt-3 text-sm text-muted">
          {retake
            ? 'O XP e as lições já feitas continuam neste aparelho. A trilha passa a começar neste patamar.'
            : 'A primeira bolinha da trilha ensina este patamar. O caminho segue para o que é mais difícil.'}
        </p>
        <Button className="mt-8" size="lg" onClick={() => onFinished(result)}>
          Ir para a trilha
        </Button>
      </div>
    )
  }

  if (!ready || !question) {
    return (
      <div className="flex min-h-0 flex-1 flex-col px-5 py-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Teste de nivelamento</p>
          {retake && onCancel ? (
            <button type="button" className="text-xs font-bold text-muted underline" onClick={onCancel}>
              Cancelar
            </button>
          ) : null}
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-white">Montando sua avaliação</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Gerando {PLACEMENT_COUNT} perguntas de vários níveis. Esta prova não fica salva: se o app abrir de novo sem o
          progresso deste aparelho, vem outro conjunto.
        </p>
      </div>
    )
  }

  const progressValue = (index / quiz.length) * 100

  function verify() {
    if (!selected || checked) return
    unlockTts()
    const ok = selected === question.answer
    setChecked(true)
    setLastCorrect(ok)
    answersRef.current[index] = ok
    playExplanation(ok ? question.explainCorrect : question.explainWrong, [question.nativePhrase])
  }

  function advance() {
    const nextIndex = index + 1
    if (nextIndex >= quiz.length) {
      setResult(bandFromAnswers(quiz, answersRef.current))
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
        <h1 className="mt-2 text-xl font-extrabold text-white">Avaliação de {quiz.length} perguntas</h1>
        <p className="mt-1 text-xs text-muted">
          Fácil, médio e difícil misturados. O Avançado só fecha se os três blocos forem bem. Esta prova foi montada agora.
        </p>
        <Progress className="mt-3" value={progressValue} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-4 pb-36">
        <p className="text-xs font-bold text-muted">
          {labelDifficulty(question.difficulty)} · pergunta {index + 1} de {quiz.length}
        </p>
        <div className="mt-2 text-lg font-extrabold leading-snug text-white">
          <GlossaryText text={question.prompt} seen={seenTerms} onSeen={onSeenTerm} />
        </div>
        {question.choicesAreEnglish ||
        question.nativePhrase.trim() === question.answer.trim() ||
        question.choices.some((choice) => choice.trim() === question.nativePhrase.trim()) ? (
          checked ? (
            <div className="mt-3">
              <PhraseBlock english={question.nativePhrase} />
            </div>
          ) : null
        ) : (
          <div className="mt-3">
            <PhraseBlock english={question.nativePhrase} />
          </div>
        )}
        <ul className="mt-4 flex flex-col gap-3">
          {choices.map((choice) => (
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
          <div className={cn('max-h-[70svh] overflow-y-auto rounded-2xl p-4', lastCorrect ? 'bg-green-soft' : 'bg-red-soft')}>
            <p className={cn('font-extrabold', lastCorrect ? 'text-green' : 'text-red')}>
              {lastCorrect ? 'Correto' : 'Ainda não'}
            </p>
            <ExplanationBlock
              text={lastCorrect ? question.explainCorrect : question.explainWrong}
              anchors={[question.nativePhrase]}
            />
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
          speak(choice, question.choicesAreEnglish ? 'native' : 'explain')
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
      {question.choicesAreEnglish ? (
        <NativeListenButton phrase={choice} />
      ) : (
        <ExplainListenButton text={choice} />
      )}
    </li>
  )
}

function labelDifficulty(difficulty: PlacementDifficulty): string {
  if (difficulty === 'easy') return 'fácil'
  if (difficulty === 'medium') return 'médio'
  return 'difícil'
}
