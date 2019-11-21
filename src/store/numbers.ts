import Vue from 'vue'

interface Numbers {
  start: number[]
  end: number[]
}

const numbers: Numbers = Vue.observable({
  start: [],
  end: [],
})

export default numbers
