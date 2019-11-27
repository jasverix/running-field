<template>
  <circle r="3" :cx="xPos" :cy="yPos" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Point extends Vue {
  @Prop({ type: Number, required: true })
  readonly xPos!: number

  @Prop({ type: Number, required: true })
  readonly yPos!: number
}
</script>
