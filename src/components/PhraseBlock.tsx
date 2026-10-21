import { NativeListenButton } from './NativeListenButton'
import { cn } from '../lib/cn'

type PhraseBlockProps = {
  english: string
  translation?: string
  caption?: string
  className?: string
}

export function PhraseBlock({ english, translation, caption, className }: PhraseBlockProps) {
  return (
    <div className={cn('rounded-2xl border-2 border-line bg-ink/60 px-3 py-3', className)}>
      {caption ? <p className="text-xs font-extrabold uppercase tracking-wide text-gold">{caption}</p> : null}
      <p className="mt-1 text-base font-extrabold leading-snug text-white">{english}</p>
      {translation ? <p className="mt-1 text-sm leading-relaxed text-muted">{translation}</p> : null}
      <div className="mt-2">
        <NativeListenButton phrase={english} />
      </div>
    </div>
  )
}
