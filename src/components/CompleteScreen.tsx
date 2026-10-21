import { challengePassThreshold, type Level, type Unit } from '../lib/lessons'
import { Button } from './ui/button'

type CompleteScreenProps = {
  level: Level
  unit: Unit
  correctCount: number
  passed: boolean
  onHome: () => void
  onRetry: () => void
}

export function CompleteScreen({ level, unit, correctCount, passed, onHome, onRetry }: CompleteScreenProps) {
  const total = unit.exercises.length
  const needed = challengePassThreshold(total)
  const challengeUnit = unit.kind === 'challenge'
  const failed = challengeUnit && !passed

  const title = failed ? 'Ainda não passou' : challengeUnit ? 'Desafio concluído' : 'Lição concluída'
  const nextLabel = nextLevelLabel(level)
  const body = failed
    ? `Você acertou ${correctCount} de ${total}. É preciso acertar pelo menos ${needed} (~75%) para desbloquear ${nextLabel}. Tente de novo quando quiser — o XP fica.`
    : challengeUnit
      ? `Você acertou ${correctCount} de ${total} (mínimo ${needed}). +${unit.xpReward} XP. ${nextLabel === 'o diploma da trilha' ? 'Você fechou a trilha de inglês falado.' : 'O próximo patamar está liberado.'}`
      : `Você acertou ${correctCount} de ${total}. +${unit.xpReward} XP de bônus. Siga para a próxima bolinha da trilha.`

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
      <p className="text-6xl" aria-hidden>
        {failed ? '💪' : challengeUnit ? '🏆' : '🎉'}
      </p>
      <h1 className={`text-2xl font-extrabold ${failed ? 'text-red' : 'text-green'}`}>{title}</h1>
      <p className="max-w-sm text-sm leading-relaxed text-muted">{body}</p>
      <div className="flex w-full max-w-xs flex-col gap-3 pt-4">
        {failed ? (
          <Button onClick={onRetry}>Tentar o desafio de novo</Button>
        ) : (
          <Button onClick={onHome}>Voltar à trilha</Button>
        )}
        {failed ? (
          <Button variant="outline" onClick={onHome}>
            Voltar à trilha
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function nextLevelLabel(level: Level): string {
  if (level.id === 'basico') return 'o Intermediário'
  if (level.id === 'intermediario') return 'o Avançado'
  if (level.id === 'avancado') return 'a Fluência'
  return 'o diploma da trilha'
}
