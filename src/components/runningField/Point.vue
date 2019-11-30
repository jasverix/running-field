<template>
  <g>
    <circle r="3" :cx="xPos" :cy="yPos" />
    <text :x="xPos - 0.5" :y="yPos + 0.5">{{ value }}</text>
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

  // private progress: number = 0

  get value (): number {
    return this.firstValue
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
