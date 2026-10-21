import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { HomePath } from './components/HomePath'
import { LessonScreen } from './components/LessonScreen'
import { CompleteScreen } from './components/CompleteScreen'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'
import { PlacementScreen } from './components/PlacementScreen'
import {
  challengePassThreshold,
  levelForUnit,
  spokenTheory,
  unitById,
  validateCurriculum,
} from './lib/lessons'
import type { PlacementBand } from './lib/placement'
import { ProgressError, ProgressStore } from './lib/progress'
import {
  getTtsStatus,
  initTts,
  speak,
  stopTts,
  subscribeTts,
  unlockTts,
  type TtsStatus,
} from './lib/tts'

type Screen =
  | { name: 'loading' }
  | { name: 'error'; message: string; allowReset: boolean }
  | { name: 'placement'; retake: boolean }
  | { name: 'home' }
  | { name: 'lesson'; unitId: string }
  | { name: 'complete'; unitId: string; correctCount: number; passed: boolean }

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
}

export default function App() {
  const [store] = useState(() => new ProgressStore())
  const [screen, setScreen] = useState<Screen>({ name: 'loading' })
  const [xp, setXp] = useState(0)
  const [tts, setTts] = useState<TtsStatus>(getTtsStatus)
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    initTts()
    return subscribeTts(setTts)
  }, [])

  useEffect(() => {
    const onInstall = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onInstall)
    return () => window.removeEventListener('beforeinstallprompt', onInstall)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        validateCurriculum()
        store.load()
        setXp(store.xp)
        if (store.needsPlacement()) {
          setScreen({ name: 'placement', retake: false })
          return
        }
        if (store.position?.unitId && unitById(store.position.unitId)) {
          setScreen({ name: 'lesson', unitId: store.position.unitId })
          return
        }
        setScreen({ name: 'home' })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Falha ao iniciar a trilha.'
        setScreen({
          name: 'error',
          message,
          allowReset: error instanceof ProgressError,
        })
      }
    }, 280)
    return () => window.clearTimeout(timer)
  }, [store])

  function refreshXp() {
    setXp(store.xp)
  }

  function goHome() {
    stopTts()
    setScreen({ name: 'home' })
    refreshXp()
  }

  function finishPlacement(band: PlacementBand) {
    if (store.placementCompleted) store.retakePlacement(band)
    else store.completePlacement(band)
    refreshXp()
    setScreen({ name: 'home' })
  }

  function startUnit(unitId: string) {
    unlockTts()
    const unit = unitById(unitId)
    const level = levelForUnit(unitId)
    if (!unit || !level) {
      setScreen({ name: 'error', message: 'Lição não encontrada no currículo.', allowReset: false })
      return
    }
    if (!store.isUnitUnlocked(level.id, unit.id)) {
      setScreen({ name: 'home' })
      return
    }
    if (store.position?.unitId !== unitId) {
      store.savePosition({ unitId, phase: 'theory', index: 0, correctCount: 0 })
    }
    setScreen({ name: 'lesson', unitId })
    speak(spokenTheory(unit), 'theory')
  }

  function finishUnit(unitId: string, correctCount: number) {
    const unit = unitById(unitId)
    const level = levelForUnit(unitId)
    if (!unit || !level) {
      setScreen({ name: 'error', message: 'Lição não encontrada no currículo.', allowReset: false })
      return
    }
    const needed = challengePassThreshold(unit.exercises.length)
    const passed = unit.kind === 'challenge' ? correctCount >= needed : true
    if (unit.kind === 'challenge') {
      if (passed) store.markChallengePassed(level.id, unit.id, unit.xpReward)
      else store.savePosition(null)
    } else {
      store.markUnitComplete(unit.id, unit.xpReward)
    }
    refreshXp()
    setScreen({ name: 'complete', unitId, correctCount, passed })
  }

  function resetProgress() {
    if (!window.confirm('Apagar o XP, o nível e o progresso salvos neste aparelho?')) return
    store.reset()
    refreshXp()
    setScreen({ name: 'placement', retake: false })
  }

  const unit = screen.name === 'lesson' || screen.name === 'complete' ? unitById(screen.unitId) : undefined
  const level = screen.name === 'lesson' || screen.name === 'complete' ? levelForUnit(screen.unitId) : undefined

  return (
    <div className="min-h-svh bg-[#071525] md:flex md:justify-center md:py-6">
      <div className="mx-auto flex h-svh min-h-0 w-full max-w-[430px] flex-col overflow-hidden bg-ink text-white md:h-[844px] md:rounded-[2rem] md:border md:border-line md:shadow-2xl">
        <Header xp={xp} />
        {screen.name === 'loading' ? <LoadingScreen /> : null}
        {screen.name === 'error' ? (
          <ErrorScreen
            message={screen.message}
            allowReset={screen.allowReset}
            onRetry={() => window.location.reload()}
            onReset={resetProgress}
          />
        ) : null}
        {screen.name === 'placement' ? (
          <PlacementScreen
            retake={screen.retake}
            onFinished={finishPlacement}
            onCancel={screen.retake ? goHome : undefined}
          />
        ) : null}
        {screen.name === 'home' ? (
          <HomePath
            store={store}
            tts={tts}
            onStart={startUnit}
            onReset={resetProgress}
            onRetake={() => setScreen({ name: 'placement', retake: true })}
            canInstall={Boolean(installEvent)}
            onInstall={async () => {
              await installEvent?.prompt()
              setInstallEvent(null)
            }}
          />
        ) : null}
        {screen.name === 'lesson' && unit && level ? (
          <LessonScreen
            key={unit.id}
            unit={unit}
            store={store}
            onXp={refreshXp}
            onExit={goHome}
            onFinished={(correctCount) => finishUnit(unit.id, correctCount)}
          />
        ) : null}
        {screen.name === 'complete' && unit && level ? (
          <CompleteScreen
            level={level}
            unit={unit}
            correctCount={screen.correctCount}
            passed={screen.passed}
            onHome={goHome}
            onRetry={() => startUnit(unit.id)}
          />
        ) : null}
      </div>
    </div>
  )
}
