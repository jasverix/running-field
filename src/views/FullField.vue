<template>
  <div>
    <Field ref="field" :numbers="numbers" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Field from '@/components/runningField/Field.vue'

const numbers: number[][] = []
for (const number of Array(100).keys()) {
  for (let i = 0; i < 8; ++i) {
    numbers.push([number + 1, number + 1])
  }
}

@Component({
  components: { Field },
})
export default class RunningField extends Vue {
  numbers = numbers
}
</script>
