<template>
  <g>
    <path class="field"
      :d="pathDescriptor"
    />

    <line
      :x1="startLinePosition.start.x" :y1="startLinePosition.start.y"
      :x2="startLinePosition.end.x" :y2="startLinePosition.end.y"
      stroke="black" stroke-width="12" stroke-dasharray="10"
    />

    <Rabbit v-for="lineValue in lines" :key="`line-${lineValue}`"
      :value="lineValue"
      color="000000" text-color="000000"
      small-text
    />

    <Rabbit :value="99.5" color="000000" no-text />
    <Rabbit :value="99.6" color="ff7777" no-text />
    <Rabbit :value="99.7" color="000000" no-text />
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Position, calculatePosition } from '@/utils/calculator'
import Rabbit from '@/components/runningField/Rabbit.vue'

interface LinePosition {
  start: Position
  end: Position
}

interface LinePositions {
  [index: number]: LinePosition
}

@Component({
  components: {
    Rabbit,
  },
})
export default class PathImage extends Vue {
  get pathDescriptor (): string {
    const d: string[] = [
      'M 1025 595',
      'C 1115 550, 1240 95, 805 1', // right outer swing
      'L 270 1',
      'C -96 35, -110 610, 270 696', // left outer swing
      'L 1080 696',
      'L 1080 595',
      'L 1035 595',
      'L 805 595',
      'C 1075 565, 1085 160, 805 100', // right inner swing
      'L 280 100',
      'C 50 120, 10 520, 280 595', // left inner swing
      'L 805 595',
    ]

    return d.join(' ')
  }

  get startLinePosition (): { start: Position, end: Position } {
    return {
      start: calculatePosition(0, 0),
      end: calculatePosition(0, 8),
    }
  }

  get lines (): number[] {
    const lines = []
    for (let i = 10; i <= 90; i += 10) {
      lines.push(i)
    }

    return lines
  }
}
</script>

<style scoped>
  .field {
    fill: #fff8da;
    fill-rule: evenodd;
    fill-opacity: 0.6;

    stroke: black;
    stroke-width: 0;
  }
</style>
