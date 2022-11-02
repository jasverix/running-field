<template>
  <g>
    <circle
      r="80"
      :cx="xPos" :cy="yPos"
      :stroke="color"
      stroke-width="2"
      :fill="color"
      fill-opacity="0.5"
    />
    <text :x="xPos - 67" :y="yPos + 12" font-size="50" :fill="color" stroke-width="1" stroke="white">
      {{ (Math.round(value * 10000) / 100).toFixed(2) }}˚
    </text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Temperature extends Vue {
  @Prop({ type: Number, default: 0 })
  public xPos!: number

  @Prop({ type: Number, default: 0 })
  public yPos!: number

  @Prop({ type: String, default: 'black' })
  public color!: string

  @Prop({ type: Number, required: true })
  public value!: number
}
</script>
