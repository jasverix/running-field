<template>
  <div>
    <Field ref="field" :numbers="numbers" />
    <VBtn @click="startProgress">Start</VBtn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

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

  mounted () {
    if (numbers.start.length === 0 || numbers.start.length !== numbers.end.length) {
      this.$router.replace({
        name: 'home',
      })
    }
  }

  startProgress () {
    const field: Field = this.$refs.field as Field
    field.startProgress()
  }
}
</script>
