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
import { Random } from '@/utils/random'
import { Gender } from '@/store/numbers'

const RANDOM_RANGE = 3

const rng = new Random('running-field-points')

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

  @Prop({ type: String, required: true })
  readonly gender!: Gender

  private color: string = '#000'

  private showNumber: boolean = false

  private thisModification: number = 0

  get value (): number {
    const firstValue = this.firstValue
    const secondValue = this.secondValue

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
      let red = 0
      let green = 0
      let blue = 0

      switch (this.gender) {
        case 'g':
          red = 50
          blue = 250
          green = Math.floor(rng.random() * (254 / 2)) + 50
          break

        case 'j':
          red = 250
          blue = 50
          green = Math.floor(rng.random() * 50) + 25
          break

        case 'e':
          red = Math.floor(rng.random() * 50) + 25
          green = red
          blue = red
          break
      }

      this.color = '#' + toHex(red) + toHex(green) + toHex(blue)

      const range = RANDOM_RANGE * 2
      const randomPlacementUnsigned = rng.random() * range
      this.thisModification = randomPlacementUnsigned - RANDOM_RANGE
    }
  }
}
</script>
