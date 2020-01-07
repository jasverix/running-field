<template>
  <g>
  <line
      stroke="black"
      stroke-width="3"
      :x1="positionA.x" :y1="positionA.y"
      :x2="positionB.x" :y2="positionB.y"
    />
    <line
      stroke="black" stroke-width="1"
      :x1="positionA.x" :y1="positionA.y"
      :x2="textPosition.x" :y2="textPosition.y"
    />
    <text :x="textPosition.x" :y="textPosition.y" font-size="50" text-anchor="middle">{{ value }} %</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Position, calculatePosition } from '@/utils/calculator'

@Component
export default class Rabbit extends Vue {
  @Prop({ type: Number, required: true })
  readonly value!: number

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
