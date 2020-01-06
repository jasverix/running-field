<template>
  <g>
    <circle r="3"
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

const RANDOM_RANGE = 1.5

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

  private showNumber = false

  get value (): number {
    const valueRange = this.secondValue - this.firstValue

    return this.firstValue + (valueRange * this.progress)
  }

  get position (): Position {
    return calculatePosition(this.value, this.lane)
  }

  get xPos (): number {
    let x = this.position.x

    if (this.randomPlacement) {
      const range = RANDOM_RANGE * 2
      const randomPlacementUnsigned = Math.random() * range
      const mod = randomPlacementUnsigned - RANDOM_RANGE

      x += mod
    }

    return x
  }

  get yPos (): number {
    let y = this.position.y

    if (this.randomPlacement) {
      const range = RANDOM_RANGE * 2
      const randomPlacementUnsigned = Math.random() * range
      const mod = randomPlacementUnsigned - RANDOM_RANGE

      y += mod
    }

    return y
  }

  beforeMount () {
    if (this.randomPlacement) {
      const red = Math.floor(Math.random() * 254)
      const green = Math.floor(Math.random() * 254)
      const blue = Math.floor(Math.random() * 254)

      this.color = '#' + toHex(red) + toHex(green) + toHex(blue)
    }
  }
}
</script>
