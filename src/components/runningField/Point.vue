<template>
  <g>
    <circle r="3" :cx="xPos" :cy="yPos" />
    <text v-if="showNumber" :x="xPos - 0.5" :y="yPos + 0.5">{{ value }}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Position, calculatePosition } from '@/utils/calculator'

@Component
export default class Point extends Vue {
  @Prop({ type: Number, required: true })
  readonly firstValue!: number

  @Prop({ type: Number, required: true })
  readonly secondValue!: number

  @Prop({ type: Number, required: true })
  readonly lane!: number

  @Prop({ type: Number, required: true })
  readonly progress!: number

  private showNumber = false

  get value (): number {
    const valueRange = this.secondValue - this.firstValue

    return this.firstValue + (valueRange * this.progress)
  }

  get position (): Position {
    return calculatePosition(this.value, this.lane)
  }

  get xPos (): number {
    return this.position.x
  }

  get yPos (): number {
    return this.position.y
  }
}
</script>
