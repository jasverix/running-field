import Mousetrap from "mousetrap"
<template>
  <div>
    <Field ref="field" :numbers="numbers" :random-placement="true" :rabbit-value="79" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Mousetrap from 'mousetrap'

import Field from '@/components/runningField/Field.vue'

@Component({
  components: { Field },
})
export default class Example extends Vue {
  get numbers (): number[][] {
    const res = []

    for (let i = 0; i < 250; ++i) {
      const startNumber = Math.floor(Math.random() * 99)
      const endNumber = Math.floor(Math.random() * (100 - startNumber)) + startNumber

      res.push([startNumber, endNumber])
    }

    return res
  }

  mounted () {
    Mousetrap.bind('space', this.startProgress)
  }

  destroyed () {
    Mousetrap.unbind('space')
  }

  startProgress () {
    const field: Field = this.$refs.field as Field
    field.startProgress()
  }
}
</script>
