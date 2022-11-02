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
          :gender="position.gender"
          :progress="progress"
          :random-placement="randomPlacement"
        />
        <Rabbit v-if="avgValue > 0" :value="avgValue" color="662222" />
        <Rabbit v-if="rabbitValue > 0" :value="rabbitValue" color="226622" />
        <template v-if="showTemperature">
          <Temperature :value="temp" color="black" :x-pos="550" :y-pos="230" />
          <Temperature :value="girlsTemp" color="red" :x-pos="400" :y-pos="400" />
          <Temperature :value="boysTemp" color="blue" :x-pos="710" :y-pos="400" />
        </template>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { progress, Progresser } from '@/utils/progress'

import Point from './Point.vue'
import Rabbit from './Rabbit.vue'
import Temperature from './Temperature.vue'
import PathImage from './PathImage.vue'
import { Gender, Person } from '@/store/numbers'

const MAX_LANES = 8

type Positions = {
  index: number
  lane: number
  gender: Gender
  start: number
  end: number
}

// noinspection SuspiciousTypeOfGuard
@Component({
  components: { Temperature, Point, Rabbit, PathImage },
})
export default class Field extends Vue {
  private progress = 0
  private progresser: Progresser | null = null

  @Prop({ type: Array, required: true })
  readonly numbers!: Person[][]

  @Prop({ type: Boolean, default: true })
  readonly randomPlacement!: boolean

  @Prop({ type: Number, default: 0 })
  readonly avgValueStart!: number

  @Prop({ type: Number, default: 0 })
  readonly rabbitValueStart!: number

  @Prop({ type: Number, default: 0 })
  readonly avgValueEnd!: number

  @Prop({ type: Number, default: 0 })
  readonly rabbitValueEnd!: number

  @Prop({ type: Boolean, default: true })
  readonly showTemperature!: boolean

  @Prop({ type: Number, default: 0 })
  readonly tempStart!: number

  @Prop({ type: Number, default: 0 })
  readonly tempEnd!: number

  @Prop({ type: Number, default: 0 })
  readonly girlsTempStart!: number

  @Prop({ type: Number, default: 0 })
  readonly girlsTempEnd!: number

  @Prop({ type: Number, default: 0 })
  readonly boysTempStart!: number

  @Prop({ type: Number, default: 0 })
  readonly boysTempEnd!: number

  get rabbitValue (): number {
    const valueRange = this.rabbitValueEnd - this.rabbitValueStart
    return this.rabbitValueStart + (valueRange * this.progress)
  }

  get avgValue (): number {
    const valueRange = this.avgValueEnd - this.avgValueStart
    return this.avgValueStart + (valueRange * this.progress)
  }

  get temp (): number {
    const valueRange = this.tempEnd - this.tempStart
    return this.tempStart + (valueRange * this.progress)
  }

  get girlsTemp (): number {
    const valueRange = this.girlsTempEnd - this.girlsTempStart
    return this.girlsTempStart + (valueRange * this.progress)
  }

  get boysTemp (): number {
    const valueRange = this.boysTempEnd - this.boysTempStart
    return this.boysTempStart + (valueRange * this.progress)
  }

  get positions () {
    const positions: Positions[] = []
    let index = 0
    for (const [start, end] of this.numbers) {
      const lane = (index % MAX_LANES) + 1
      positions.push({
        index: ++index,
        lane,
        gender: start.gender,
        start: start.number,
        end: end.number,
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
    if (this.progresser === null || !this.progresser.isRunning()) {
      this.playVideo()
      this.progresser = progress({
        max: 1,
        handler: v => {
          this.progress = v
        },
        intervalTime: 20,
        steps: 500,
      })
    }
  }

  public async reset () {
    if (this.progresser) {
      await this.progresser.cancel()
    }
    this.progresser = null
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
