<template>
  <div>
    <Field ref="field" :numbers="numbers" :random-placement="true" :rabbit-value="rabbitValue" :avg-value="avgValue" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Mousetrap from 'mousetrap'

import Field from '@/components/runningField/Field.vue'
import numbers from '@/store/numbers'

@Component({
  components: { Field },
})
export default class RunningField extends Vue {
  get numbers (): number[][] {
    const res = []

    for (let i = 0; i < numbers.start.length; ++i) {
      const startNumber = numbers.start[i]
      const endNumber = numbers.end[i] || 0

      res.push([startNumber, endNumber])
    }

    return res
  }

  get rabbitValue (): number | null {
    return numbers.rabbit
  }

  get avgValue (): number | null {
    return numbers.avg
  }

  mounted () {
    if (numbers.start.length === 0 || numbers.start.length !== numbers.end.length) {
      this.$router.replace({
        name: 'home',
      })
      return
    }

    Mousetrap.bind('space', this.startProgress)
  }

  destroyed () {
    Mousetrap.unbind('space')
  }

  startProgress () {
    const field: Field = this.$refs.field as Field
    field.startProgress()
  }

  goFullscreen () {
    const field: Field = this.$refs.field as Field
    field.goFullscreen()
  }
}
</script>
