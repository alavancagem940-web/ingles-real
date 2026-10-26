import { describe, expect, it } from 'vitest'
import { teacherSegments } from './teacher-speech'

describe('leitura de professor', () => {
  it('entrega a frase em inglês para a Jenny e a explicação para a Francisca', () => {
    const segments = teacherSegments(
      "Hey, what's up? é um oi informal entre amigos nos EUA. Não pede uma resposta longa.",
    )
    expect(segments[0]).toEqual({ lang: 'en', text: "Hey, what's up?" })
    expect(segments.slice(1).every((segment) => segment.lang === 'pt')).toBe(true)
    expect(segments.map((segment) => segment.text).join(' ')).toContain('oi informal')
  })

  it('isola gonna no meio da frase em português', () => {
    const segments = teacherSegments('Going to vira gonna na fala: I am going to call you.')
    const english = segments.filter((segment) => segment.lang === 'en').map((segment) => segment.text)
    expect(english.some((line) => line.includes('Going to'))).toBe(true)
    expect(english.some((line) => line.includes('gonna'))).toBe(true)
    expect(english.some((line) => line.includes('I am going to call you'))).toBe(true)
    expect(segments.some((segment) => segment.lang === 'pt' && segment.text.includes('vira'))).toBe(true)
    expect(segments.some((segment) => segment.lang === 'pt' && segment.text.includes('na fala'))).toBe(true)
  })

  it('lê a alternativa em português só em português', () => {
    expect(teacherSegments('Oi, e aí?')).toEqual([{ lang: 'pt', text: 'Oi, e aí?' }])
  })
})
