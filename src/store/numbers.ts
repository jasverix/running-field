import Vue from 'vue'

interface Numbers {
  start: number[]
  end: number[]
  rabbitStart: number | null
  rabbitEnd: number | null
  avgStart: number | null
  avgEnd: number | null
}

const numbers: Numbers = Vue.observable({
  start: [],
  end: [],
  rabbitStart: null,
  rabbitEnd: null,
  avgStart: null,
  avgEnd: null,
})

export default numbers
