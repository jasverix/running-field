<template>
  <g>
    <line
      :stroke="darkColor" stroke-width="3"
      :x1="positionA.x" :y1="positionA.y"
      :x2="positionB.x" :y2="positionB.y"
    />
    <line v-if="!noText"
      :stroke="darkColor" stroke-width="1"
      :x1="positionA.x" :y1="positionA.y"
      :x2="textPosition.x" :y2="textPosition.y"
    />
    <text v-if="!noText"
      :x="textPosition.x" :y="textPosition.y"
      :font-size="smallText ? 30 : 50"
      text-anchor="middle"
      :fill="textColorCalc"
      :stroke="lightColor" stroke-width="1"
    >
      {{ valueText }} %
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

function strTrimRight (sString: string, chars: string | undefined): string {
  if (sString === '') return ''
  if (chars === undefined) chars = ' '

  while (chars.indexOf(sString.substring(sString.length - 1, sString.length)) !== -1) {
    if (sString === '') return ''
    sString = sString.substring(0, sString.length - 1)
  }
  return sString
}

@Component
export default class Rabbit extends Vue {
  @Prop({ type: Number, required: true })
  readonly value!: number

  @Prop({ type: String, default: 'black' })
  readonly color!: string

  @Prop({ type: String })
  readonly textColor!: string

  @Prop({ type: Boolean })
  readonly smallText!: boolean

  @Prop({ type: Boolean })
  readonly noText!: boolean

  get valueText (): string {
    return strTrimRight(strTrimRight(this.value.toFixed(1), '0'), '.')
  }

  get textColorCalc (): string {
    if (this.textColor) {
      return '#' + this.textColor
    }
    return this.darkColor
  }

  get darkColor (): string {
    return '#' + this.color
  }

  get lightColor (): string {
    return '#' + lightenDarkenColor(this.textColor || this.color, 90)
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
