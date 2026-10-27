import { Volume2 } from 'lucide-react'
import { EXPLAIN_LISTEN_LABEL } from '../lib/speech-persona'
import { speak, speakPortugueseThenNative, unlockTts } from '../lib/tts'
import { Button } from './ui/button'

type ExplainListenButtonProps = {
  text: string
  className?: string
  thenNative?: readonly string[]
}

export function ExplainListenButton({ text, className, thenNative = [] }: ExplainListenButtonProps) {
  return (
    <Button
      variant="gold"
      size="sm"
      className={className}
      aria-label={EXPLAIN_LISTEN_LABEL}
      onClick={(event) => {
        event.stopPropagation()
        unlockTts()
        if (thenNative.length > 0) speakPortugueseThenNative(text, thenNative)
        else speak(text, 'explain')
      }}
    >
      <Volume2 className="size-4 shrink-0" aria-hidden />
      {EXPLAIN_LISTEN_LABEL}
    </Button>
  )
}
