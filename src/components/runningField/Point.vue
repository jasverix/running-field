<template>
  <g>
    <circle r="4"
      stroke="black"
      stroke-width="0.5"
      :cx="xPos"
      :cy="yPos"
      :fill="color"
    />
    <text v-if="showNumber" :x="xPos - 0.5" :y="yPos + 0.5">{{ value }}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Position, calculatePosition } from '@/utils/calculator'

const RANDOM_RANGE = 3

function toHex (num: number): string {
  const hex = num.toString(16)
  if (hex.length < 2) {
    return `0${hex}`
  }
  return hex
}

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

  @Prop({ type: Boolean, default: true })
  readonly randomPlacement!: boolean

  private color: string = '#000'

  private showNumber: boolean = false

  private thisModification: number = 0

  get value (): number {
    let firstValue = this.firstValue
    let secondValue = this.secondValue

    // if point is going backwards (due to changing goals) just leave the point at the ending point
    if (secondValue < firstValue) {
      return secondValue
    }

    const valueRange = secondValue - firstValue
    if (valueRange < 0.1) {
      return secondValue
    }

    return firstValue + (valueRange * this.progress)
  }

  get position (): Position {
    return calculatePosition(this.value, this.lane)
  }

  get xPos (): number {
    return this.position.x + this.thisModification
  }

  get yPos (): number {
    return this.position.y + this.thisModification
  }

  beforeMount () {
    if (this.randomPlacement) {
      const COLOR_MAX = 254 / 2
      const COLOR_ADJ = 50

      const red = Math.floor(Math.random() * COLOR_MAX) + COLOR_ADJ
      const green = Math.floor(Math.random() * COLOR_MAX) + COLOR_ADJ
      const blue = Math.floor(Math.random() * COLOR_MAX) + COLOR_ADJ

      this.color = '#' + toHex(red) + toHex(green) + toHex(blue)

      const range = RANDOM_RANGE * 2
      const randomPlacementUnsigned = Math.random() * range
      this.thisModification = randomPlacementUnsigned - RANDOM_RANGE
    }
  }
}
</script>
