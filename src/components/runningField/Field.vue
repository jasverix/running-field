<template>
  <div class="running-field">
    <div class="bg-video">
      <video ref="video" muted>
        <source src="@/assets/bg-movie.mp4"/>
      </video>
    </div>
    <div class="field">
      <svg ref="canvas" width="100vw" height="100vh" viewBox="0 0 1105 700">
        <PathImage />
        <Point v-for="position in positions" :key="position.index"
          :first-value="position.start"
          :second-value="position.end"
          :lane="position.lane"
          :progress="progress"
          :random-placement="randomPlacement"
        />
        <Rabbit v-if="avgValue > 0" :value="avgValue" color="662222" />
        <Rabbit v-if="rabbitValue > 0" :value="rabbitValue" color="226622" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { progress } from '@/utils/progress'

import Point from '@/components/runningField/Point.vue'
import Rabbit from '@/components/runningField/Rabbit.vue'
import PathImage from './PathImage.vue'

const MAX_LANES = 8

@Component({
  components: { Point, Rabbit, PathImage },
})
export default class Field extends Vue {
  private progress = 0

  @Prop({ type: Array, required: true })
  readonly numbers!: number[][]

  @Prop({ type: Boolean, default: true })
  readonly randomPlacement!: boolean

  @Prop({ type: Number, default: 0 })
  readonly avgValue!: number

  @Prop({ type: Number, default: 0 })
  readonly rabbitValue!: number

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

  public mounted () {
    const video = this.$refs.video as HTMLVideoElement
    if (typeof video.loop === 'boolean') {
      video.loop = true
    }

    video.addEventListener('ended', () => {
      video.currentTime = 0
      video.play()
    })
  }

  public startProgress () {
    if (this.progress === 0) {
      this.playVideo()
      progress({
        max: 1,
        handler: v => {
          this.progress = v
        },
        intervalTime: 1,
        steps: 175,
      })
    }
  }

  public reset () {
    this.progress = 0
  }

  public goFullscreen () {
    // const canvas = this.$refs.canvas as SVGElement
    this.$el.requestFullscreen()
  }

  public playVideo () {
    try {
      const video = this.$refs.video as HTMLVideoElement
      video.play()
    } catch (e) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .running-field {
    background-color: black;
    width: 100vw;
    height: 100vh;
    border: 1px solid black;
    box-sizing: border-box;
    overflow: hidden;
  }

  .bg-video {
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;

    video {
      width: 100vw;
      height: 100vh;
    }
  }

  .field {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
