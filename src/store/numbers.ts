import Vue from 'vue'
import { debounce } from '@/utils/debounce'

interface Numbers {
  start: (number | null)[]
  end: (number | null)[]
  rabbitStart: number | null
  rabbitEnd: number | null
  avgStart: number | null
  avgEnd: number | null
}

export function parseNumbers (value: string): (number | null)[] {
  return value.split('\n')
    .map((line: string, index: number) => {
      if (line === '-') {
        return null
      }

      return parseFloat(line.trim().replace(',', '.'))
    })
    .filter(num => num === null || (num !== void 0 && !isNaN(num)))
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
    localStorage.setItem(`rf.numbers.${key}`, (dataToStore[key] as number[]).map(num => num === null ? '-' : num.toString()).join('\n'))
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
