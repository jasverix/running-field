import Vue from 'vue'

interface Numbers {
  start: number[]
  end: number[]
  rabbit: number | null
}

const numbers: Numbers = Vue.observable({
  start: [],
  end: [],
  rabbit: null,
})

export default numbers
