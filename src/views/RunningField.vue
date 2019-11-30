<template>
  <div class="running-field">
    <svg width="1105" height="700">
      <Point v-for="position in positions" :key="position.index"
        :first-value="position.start"
        :second-value="position.end"
        :lane="position.lane"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Point from '@/components/runningField/Point.vue'

const MAX_LANES = 8

@Component({
  components: { Point },
})
export default class RunningField extends Vue {
  private numbers: number[][] = [...Array(101).keys()].map(i => [i, 10])

  get positions () {
    const positions = []

    let index = 0
    for (const [start, end] of this.numbers) {
      const lane = 1 // (index % MAX_LANES) + 1
      positions.push({
        index: ++index,
        lane,
        start,
        end,
      })
    }

    return positions
  }
}
</script>

<style lang="scss">
  .running-field {
    background-image: url('../assets/running-track.png');
    background-size: contain;
    background-color: #95ff25;
    width: 1105px;
    height: 700px;
    margin: auto;
    border: 1px solid black;
  }
</style>
