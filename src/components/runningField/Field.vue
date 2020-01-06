<template>
  <div class="running-field">
    <svg width="1105" height="700">
      <Point v-for="position in positions" :key="position.index"
        :first-value="position.start"
        :second-value="position.end"
        :lane="position.lane"
        :progress="progress"
        :random-placement="randomPlacement"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { progress } from '@/utils/progress'

import Point from '@/components/runningField/Point.vue'

const MAX_LANES = 8

@Component({
  components: { Point },
})
export default class Field extends Vue {
  private progress = 0

  @Prop({ type: Array, required: true })
  readonly numbers!: number[][]

  @Prop({ type: Boolean, default: true })
  readonly randomPlacement!: boolean

  get positions () {
    const positions = []

    let index = 0
    for (const [start, end] of this.numbers) {
      const lane = (index % MAX_LANES) + 1
      positions.push({
        index: ++index,
        lane,
        start,
        end,
      })
    }

    return positions
  }

  public startProgress () {
    if (this.progress === 0) {
      progress({
        max: 1,
        handler: v => {
          this.progress = v
        },
      })
    }
  }
}
</script>

<style lang="scss">
  .running-field {
    background-image: url('../../assets/running-track.png');
    background-size: contain;
    background-color: #95ff25;
    width: 1105px;
    height: 700px;
    margin: auto;
    border: 1px solid black;
  }
</style>
