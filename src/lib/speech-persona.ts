export type SpeakKind = 'prompt' | 'choice' | 'theory' | 'native' | 'feedback-correct' | 'feedback-wrong'

/**
 * Turns lesson copy into a single spoken line. No openers, wrappers,
 * breathy pauses or flirty delivery — English listening training only.
 */
export function toSpokenText(text: string): string {
  return text
    .replace(/\r/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const NATIVE_LISTEN_LABEL = 'Ouvir Pronúncia Nativa'
