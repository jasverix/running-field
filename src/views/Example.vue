import Mousetrap from "mousetrap"
<template>
  <div>
    <Field ref="field"
      :numbers="numbers" :random-placement="true"
      :rabbit-value-start="74" :rabbit-value-end="76"
      :avg-value-start="63" :avg-value-end="64"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Mousetrap from 'mousetrap'
import { Random } from '@/utils/random'

import Field from '@/components/runningField/Field.vue'

@Component({
  components: { Field },
})
export default class Example extends Vue {
  private _rng: Random | null = null
  get rng (): Random {
    if (this._rng) return this._rng

    const seed = String(this.$route.query.seed || (Math.random() * 250).toString(16))
    this._rng = new Random(seed)

    return this._rng
  }

  get numbers (): number[][] {
    const res = []

    for (let i = 0; i < 250; ++i) {
      const startNumber = Math.floor(this.rng.random() * 99)
      const endNumber = Math.floor(this.rng.random() * (100 - startNumber)) + startNumber

      res.push([startNumber, endNumber])
    }

    return res
  }

  mounted () {
    Mousetrap.bind('space', this.startProgress)
    Mousetrap.bind('q', this.reset)
  }

  destroyed () {
    Mousetrap.unbind('space')
    Mousetrap.unbind('q')
  }

  startProgress () {
    const field: Field = this.$refs.field as Field
    field.startProgress()
  }

  reset () {
    const field: Field = this.$refs.field as Field
    field.reset()
  }
}
</script>
