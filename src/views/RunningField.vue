<template>
  <div class="running-field">
    <svg>
      <Point x-pos="10" y-pos="10" />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Point from '@/components/runningField/Point.vue'
import { calculatePosition } from '@/utils/calculator'

export default Vue.extend({
  name: 'RunningField',

  components: {
    Point,
  },

  data () {
    return {
      numbers: [
        [0, 10],
      ],
    }
  },

  computed: {
    positions () {
      const positions = []

      for (const [start, end] of this.numbers) {
        positions.push({
          start: calculatePosition(start),
          end: calculatePosition(end),
        })
      }

      return positions
    },
  },
})
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
