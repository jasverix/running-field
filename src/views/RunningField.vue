<template>
  <div>
    <Field ref="field"
      :numbers="numbers"
      :random-placement="true"
      :rabbit-value-start="rabbitValueStart"
      :rabbit-value-end="rabbitValueEnd"
      :avg-value-start="avgValueStart"
      :avg-value-end="avgValueEnd"
      :temp-start="tempStart"
      :temp-end="tempEnd"
      :girls-temp-start="girlsTempStart"
      :girls-temp-end="girlsTempEnd"
      :boys-temp-start="boysTempStart"
      :boys-temp-end="boysTempEnd"
      :show-temperature="showTemperature"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Mousetrap from 'mousetrap'

import Field from '@/components/runningField/Field.vue'
import numbers, { Person } from '@/store/numbers'

@Component({
  components: { Field },
})
export default class RunningField extends Vue {
  get numbers (): Person[][] {
    const res: Person[][] = []

    for (let i = 0; i < numbers.end.length; ++i) {
      // may be additional numbers on end array
      const startNumber = i < numbers.start.length ? numbers.start[i] : numbers.end[i]
      const endNumber = numbers.end[i]

      if (startNumber === null || endNumber === null) {
        continue
      }

      res.push([startNumber, endNumber])
    }

    return res
  }

  get rabbitValueStart (): number | null {
    return numbers.rabbitStart
  }

  get avgValueStart (): number | null {
    return numbers.avgStart
  }

  get rabbitValueEnd (): number | null {
    return numbers.rabbitEnd
  }

  get avgValueEnd (): number | null {
    return numbers.avgEnd
  }

  get girlsTempStart (): number {
    return numbers.girlsTempStart
  }

  get girlsTempEnd (): number {
    return numbers.girlsTempEnd
  }

  get boysTempStart (): number {
    return numbers.boysTempStart
  }

  get boysTempEnd (): number {
    return numbers.boysTempEnd
  }

  get tempStart (): number {
    return numbers.tempStart
  }

  get tempEnd (): number {
    return numbers.tempEnd
  }

  get showTemperature (): boolean {
    return localStorage.getItem('showTemperature') !== 'false'
  }

  mounted () {
    if (numbers.start.length === 0 || numbers.start.length > numbers.end.length) {
      console.warn('Mismatch between starting numbers and ending numbers', {
        startLength: numbers.start.length,
        endLength: numbers.end.length,
      })
      this.$router.replace({
        name: 'home',
      })
      return
    }

    Mousetrap.bind('space', this.startProgress)
    Mousetrap.bind('q', this.reset)
    Mousetrap.bind('f', this.goFullscreen)
    Mousetrap.bind('backspace', () => this.$router.push({ name: 'home' }))
  }

  destroyed () {
    Mousetrap.unbind('space')
    Mousetrap.unbind('q')
    Mousetrap.unbind('f')
    Mousetrap.unbind('backspace')
  }

  startProgress () {
    const field: Field = this.$refs.field as Field
    field.startProgress()
  }

  reset () {
    const field: Field = this.$refs.field as Field
    field.reset()
  }

  goFullscreen () {
    const field: Field = this.$refs.field as Field
    field.goFullscreen()
  }
}
</script>
