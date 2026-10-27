import { nativePhrasesIn } from '../lib/native-snippets'
import { speakPortugueseThenNative } from '../lib/tts'
import { ExplainListenButton } from './ExplainListenButton'
import { PhraseBlock } from './PhraseBlock'

type ExplanationBlockProps = {
  text: string
  anchors?: readonly string[]
  showText?: boolean
}

export function playExplanation(text: string, anchors: readonly string[] = []): void {
  speakPortugueseThenNative(text, nativePhrasesIn(text, anchors))
}

export function ExplanationBlock({ text, anchors = [], showText = true }: ExplanationBlockProps) {
  const phrases = nativePhrasesIn(text, anchors)
  return (
    <div>
      {showText ? <p className="mt-1 text-sm leading-relaxed text-white/90">{text}</p> : null}
      <div className="mt-2">
        <ExplainListenButton text={text} thenNative={phrases} />
      </div>
      {phrases.length > 0 ? (
        <div className="mt-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold">Como um nativo fala</p>
          <ul className="mt-2 flex flex-col gap-2">
            {phrases.map((phrase) => (
              <li key={phrase}>
                <PhraseBlock english={phrase} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
