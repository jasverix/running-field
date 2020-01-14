import Vue from 'vue'

interface Numbers {
  start: number[]
  end: number[]
  rabbit: number | null
  avg: number | null
}

const numbers: Numbers = Vue.observable({
  start: [],
  end: [],
  rabbit: null,
  avg: null,
})

export default numbers
