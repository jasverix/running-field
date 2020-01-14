<template>
  <g>
    <line
      :stroke="darkColor" stroke-width="3"
      :x1="positionA.x" :y1="positionA.y"
      :x2="positionB.x" :y2="positionB.y"
    />
    <line
      :stroke="darkColor" stroke-width="1"
      :x1="positionA.x" :y1="positionA.y"
      :x2="textPosition.x" :y2="textPosition.y"
    />
    <text
      :x="textPosition.x" :y="textPosition.y"
      font-size="50"
      text-anchor="middle"
      :fill="darkColor"
      :stroke="lightColor" stroke-width="1"
    >
      {{ value }} %
    </text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Position, calculatePosition } from '@/utils/calculator'

function lightenDarkenColor (col: string, amt: number) {
  const num = parseInt(col, 16)
  const r = (num >> 16) + amt
  const b = ((num >> 8) & 0x00FF) + amt
  const g = (num & 0x0000FF) + amt
  const newColor = g | (b << 8) | (r << 16)

  return newColor.toString(16)
}

@Component
export default class Rabbit extends Vue {
  @Prop({ type: Number, required: true })
  readonly value!: number

  @Prop({ type: String, default: 'black' })
  readonly color!: string

  get darkColor (): string {
    return '#' + this.color
  }

  get lightColor (): string {
    return '#' + lightenDarkenColor(this.color, 75)
  }

  get positionA (): Position {
    return calculatePosition(this.value, 0)
  }

  get positionB (): Position {
    return calculatePosition(this.value, 9)
  }

  get textPosition (): Position {
    return calculatePosition(this.value, -3)
  }
}
</script>
