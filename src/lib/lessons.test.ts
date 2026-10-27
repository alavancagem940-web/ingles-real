import { describe, expect, it } from 'vitest'
import {
  LEVELS,
  NATIVE_LISTEN_LABEL,
  THEORY_CARD_TITLE,
  challengePassThreshold,
  unitPassed,
  checkAnswer,
  englishPhrasesOf,
  iterUnits,
  spokenTheory,
  validateCurriculum,
} from './lessons'
import { PLACEMENT_QUESTIONS } from './placement'

describe('currículo', () => {
  it('valida a trilha do Básico à Fluência', () => {
    validateCurriculum()
    expect(LEVELS.map((level) => level.band)).toEqual(['Básico', 'Intermediário', 'Avançado', 'Fluência'])
  })

  it('cobre reduções, gírias, idioms e phrasal verbs dos EUA', () => {
    const blob = JSON.stringify(LEVELS).toLowerCase()
    expect(blob).toMatch(/gonna/)
    expect(blob).toMatch(/wanna/)
    expect(blob).toMatch(/whatcha/)
    expect(blob).toMatch(/hang out/)
    expect(blob).toMatch(/piece of cake/)
    expect(blob).toMatch(/didja/)
  })

  it('aceita as respostas canônicas e rejeita lixo', () => {
    for (const [, unit] of iterUnits()) {
      for (const exercise of unit.exercises) {
        const submission =
          exercise.type === 'multiple_choice'
            ? exercise.answer
            : exercise.type === 'fill_blank'
              ? exercise.accepted[0]
              : exercise.lines
        expect(checkAnswer(exercise, submission).correct, exercise.id).toBe(true)
      }
    }
    const fill = [...iterUnits()].flatMap(([, unit]) => unit.exercises).find((item) => item.type === 'fill_blank')
    const order = [...iterUnits()].flatMap(([, unit]) => unit.exercises).find((item) => item.type === 'order_phrase')
    expect(fill && checkAnswer(fill, 'totally-wrong-xxx').correct).toBe(false)
    expect(order && checkAnswer(order, [...order.lines].reverse()).correct).toBe(false)
  })

  it('exige cerca de 75% para abrir a próxima lição ou o próximo patamar', () => {
    expect(challengePassThreshold(4)).toBe(3)
    expect(challengePassThreshold(5)).toBe(4)
    expect(unitPassed(1, 4)).toBe(false)
    expect(unitPassed(3, 4)).toBe(true)
  })

  it('coloca Explicação Teórica Prática com regra, cultura e exemplos traduzidos', () => {
    expect(THEORY_CARD_TITLE).toBe('Explicação Teórica Prática')
    let units = 0
    for (const [, unit] of iterUnits()) {
      units += 1
      expect(unit.theory.concept.length).toBeGreaterThan(40)
      expect(unit.theory.culture.length).toBeGreaterThan(40)
      expect(unit.theory.examples.length).toBeGreaterThanOrEqual(2)
      for (const example of unit.theory.examples) {
        expect(example.english.trim().length).toBeGreaterThan(2)
        expect(example.translation.trim().length).toBeGreaterThan(2)
      }
      const spoken = spokenTheory(unit)
      expect(spoken).toContain(unit.theory.examples[0]!.english)
      expect(spoken.includes(unit.theory.concept.slice(0, 32))).toBe(false)
    }
    expect(units).toBeGreaterThanOrEqual(12)
  })

  it('a voz da teoria lê o inglês visível do card, não o resumo', () => {
    const unit = LEVELS[0]?.units[0]
    expect(unit?.id).toBe('b1_gonna_wanna')
    if (!unit) return
    const spoken = spokenTheory(unit)
    expect(spoken).toContain("I'm gonna call you later.")
    expect(spoken).toContain('Do you wanna grab coffee?')
    expect(spoken).toContain('See ya. I wanna go home.')
    expect(spoken).not.toContain(unit.theory.concept.slice(0, 40))
  })

  it('todo exercício e toda frase de exemplo têm texto inglês para Ouvir Pronúncia Nativa', () => {
    expect(NATIVE_LISTEN_LABEL).toBe('Ouvir Pronúncia Nativa')
    for (const [, unit] of iterUnits()) {
      for (const example of unit.theory.examples) {
        expect(example.english.length).toBeGreaterThan(2)
      }
      for (const exercise of unit.exercises) {
        expect(exercise.nativePhrase.trim().length).toBeGreaterThan(2)
        expect(englishPhrasesOf(exercise).length).toBeGreaterThan(0)
      }
    }
    for (const question of PLACEMENT_QUESTIONS) {
      expect(question.nativePhrase.trim().length).toBeGreaterThan(2)
    }
  })
})
