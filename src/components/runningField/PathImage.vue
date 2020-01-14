<template>
  <path
    stroke="white" stroke-width="2"
    fill="brown"
    :d="descriptor"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export class PathImage extends Vue {
  get descriptor (): string {
    const d: string[] = [
      'M 10 80',
      'A 357 830 90 0 0 357 830',
    ]

    return d.join(' ')
  }
}
</script>
