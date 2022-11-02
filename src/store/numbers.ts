import Vue from 'vue'
import { debounce } from '@/utils/debounce'

interface NumbersInput {
  start: (Person | null)[]
  end: (Person | null)[]
  rabbitStart: number | null
  rabbitEnd: number | null
}

class Numbers {
  public start: (Person | null)[]
  public end: (Person | null)[]
  public rabbitStart: number | null
  public rabbitEnd: number | null

  constructor (input: NumbersInput) {
    this.start = input.start
    this.end = input.end
    this.rabbitStart = input.rabbitStart
    this.rabbitEnd = input.rabbitEnd
  }

  get avgStart (): number | null {
    const numbers = this.start.filter(n => n !== null).map(n => n?.number ?? 0)
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
  }

  get avgEnd (): number | null {
    const numbers = this.end.filter(n => n !== null).map(n => n?.number ?? 0)
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
  }
}

export type Gender = 'g' | 'j' | 'e'

export interface Person {
  number: number
  gender: Gender
}

function trim (str: string | undefined, chars: string): string {
  if (str === undefined) return ''
  let start = 0
  let end = str.length

  while (start < end && chars.indexOf(str[start]) >= 0) {
    ++start
  }

  while (end > start && chars.indexOf(str[end - 1]) >= 0) {
    --end
  }

  return (start > 0 || end < str.length) ? str.substring(start, end) : str
}

export function parseNumbers (value: string, referenceNumbers?: (Person | null)[]): (Person | null)[] {
  return value.trim().split('\n')
    .map((line: string, index: number) => {
      if (line === '-') return null

      const lineParts = line.trim().split('\t')
      let genderKey: string = 'e'
      let numberKey: string = '0'

      switch (lineParts.length) {
        case 1:
          numberKey = lineParts[0]
          break

        case 2:
          genderKey = lineParts[0] as Gender
          numberKey = lineParts[1]
          break
      }

      let gender: Gender = genderKey as Gender
      if (referenceNumbers) {
        if (referenceNumbers[index]) gender = referenceNumbers[index]?.gender as Gender
      }
      const number: number = parseFloat(trim(numberKey, '% .;,').replace(',', '.'))

      if (isNaN(number)) return null
      const person: Person = {
        gender,
        number,
      }
      return person
    })
}

function fetchData (): Numbers {
  const numbers: NumbersInput = {
    start: [],
    end: [],
    rabbitStart: null,
    rabbitEnd: null,
  }

  const startNumbers = localStorage.getItem('rf.numbers.start')
  const endNumbers = localStorage.getItem('rf.numbers.end')
  if (startNumbers) numbers.start = parseNumbers(startNumbers)
  if (endNumbers) numbers.end = parseNumbers(endNumbers, numbers.start)

  for (const key of ['rabbitStart', 'rabbitEnd', 'avgStart', 'avgEnd']) {
    const storedValue = localStorage.getItem(`rf.numbers.${key}`)
    if (storedValue) {
      (numbers as any)[key] = parseFloat(storedValue)
    }
  }

  return new Numbers(numbers)
}

export function personToString (person: Person | null): string {
  return person === null ? '-' : (`${person.gender}\t${person.number.toString()}`)
}

const storeData = debounce((numbers: Numbers) => {
  const dataToStore = numbers as { [k: string]: any }
  for (const key of ['start', 'end']) {
    localStorage.setItem(`rf.numbers.${key}`, (dataToStore[key] as (Person | null)[])
      .map(personToString)
      .join('\n'),
    )
  }
  for (const key of ['rabbitStart', 'rabbitEnd', 'avgStart', 'avgEnd']) {
    localStorage.setItem(`rf.numbers.${key}`, dataToStore[key])
  }
}, 500)

const Watcher = Vue.extend({
  data () {
    return { numbers: fetchData() }
  },

  watch: {
    numbers: {
      deep: true,
      handler (numbers) {
        storeData(numbers)
      },
    },
  },
})
const numbers: Numbers = (new Watcher()).numbers

export default numbers

export function newWeek (): void {
  numbers.rabbitStart = numbers.rabbitEnd
  numbers.start = numbers.end

  numbers.end = []
  numbers.rabbitEnd = (numbers.rabbitEnd || 0) + 1
}
