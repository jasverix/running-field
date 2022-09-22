import Vue from 'vue'
import { debounce } from '@/utils/debounce'

interface Numbers {
  start: (Person | null)[]
  end: (Person | null)[]
  rabbitStart: number | null
  rabbitEnd: number | null
  avgStart: number | null
  avgEnd: number | null
}

export type Gender = 'g' | 'j'

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

export function parseNumbers (value: string): (Person | null)[] {
  return value.trim().split('\n')
    .map((line: string, index: number) => {
      if (line === '-') {
        return null
      }

      const [genderKey, numberKey] = line.trim().split('\t')
      const gender = genderKey as Gender
      let number: number = parseFloat(trim(numberKey, '% .;,').replace(',', '.'))

      if (isNaN(number)) return null
      const person: Person = {
        gender,
        number,
      }
      return person
    })
}

function fetchData (): Numbers {
  const numbers: { [k: string]: any } = {
    start: [],
    end: [],
    rabbitStart: null,
    rabbitEnd: null,
    avgStart: null,
    avgEnd: null,
  }

  for (const key of ['start', 'end']) {
    const storedValue = localStorage.getItem(`rf.numbers.${key}`)
    if (storedValue) {
      numbers[key] = parseNumbers(storedValue)
    }
  }
  for (const key of ['rabbitStart', 'rabbitEnd', 'avgStart', 'avgEnd']) {
    const storedValue = localStorage.getItem(`rf.numbers.${key}`)
    if (storedValue) {
      numbers[key] = parseFloat(storedValue)
    }
  }

  return numbers as Numbers
}

const storeData = debounce((numbers: Numbers) => {
  const dataToStore = numbers as { [k: string]: any }
  for (const key of ['start', 'end']) {
    localStorage.setItem(`rf.numbers.${key}`, (dataToStore[key] as (Person | null)[])
      .map(num => num === null ? '-' : (`${num.gender}\t${num.number.toString()}`))
      .join('\n')
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
  numbers.avgStart = numbers.avgEnd
  numbers.start = numbers.end

  numbers.end = []
  numbers.rabbitEnd = (numbers.rabbitEnd || 0) + 1
}
