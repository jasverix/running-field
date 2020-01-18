<template>
  <div class="home">
    <div style="height: 90vh">
      <VLayout justify-center style="margin-bottom: 20px">
        <VBtn @click="newWeek">← Ny uke</VBtn>
      </VLayout>

      <VLayout>
        <VFlex>
          <h2>Forrige uke</h2>
          <VLabel>Måltall</VLabel>
          <VTextField type="number" v-model="rabbitValueStart" />

          <VLabel>Gjennomsnitt</VLabel>
          <VTextField type="number" v-model="avgValueStart" />

          <VLabel>Numre</VLabel>
          <VTextarea v-model="startNumbers" rows="30" />
        </VFlex>

        <VFlex style="border-right: 1px solid; margin-right: 70px">
          &nbsp; &nbsp;
        </VFlex>

        <VFlex>
          <h2>Denne uka</h2>
          <VLabel>Måltall</VLabel>
          <VTextField type="number" v-model="rabbitValueEnd" />

          <VLabel>Gjennomsnitt</VLabel>
          <VTextField type="number" v-model="avgValueEnd" />

          <VLabel>Numre</VLabel>
          <VTextarea v-model="endNumbers" rows="30" />
        </VFlex>
      </VLayout>

      <hr style="margin-bottom: 10px">

      <VBtn @click="start">
        Start
      </VBtn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import numbers, { parseNumbers, newWeek } from '@/store/numbers'
import Mousetrap from 'mousetrap'

@Component
export default class Home extends Vue {
  public startNumbers: string = ''
  public endNumbers: string = ''
  public rabbitValueStart: string = ''
  public rabbitValueEnd: string = ''
  public avgValueStart: string = ''
  public avgValueEnd: string = ''

  @Watch('startNumbers')
  onStartNumbersChanged (value: string) {
    numbers.start = parseNumbers(value)
  }

  @Watch('endNumbers')
  onEndNumbersChanged (value: string) {
    numbers.end = parseNumbers(value)
  }

  @Watch('rabbitValueStart')
  onRabbitValueStartChanged (value: string) {
    const rabbit = parseFloat(value)
    if (rabbit && !isNaN(rabbit)) {
      numbers.rabbitStart = rabbit
    } else {
      numbers.rabbitStart = null
    }
  }

  @Watch('avgValueStart')
  onAvgValueStartChanged (value: string) {
    const avg = parseFloat(value)
    if (avg && !isNaN(avg)) {
      numbers.avgStart = avg
    } else {
      numbers.avgStart = null
    }
  }

  @Watch('rabbitValueEnd')
  onRabbitValueEndChanged (value: string) {
    const rabbit = parseFloat(value)
    if (rabbit && !isNaN(rabbit)) {
      numbers.rabbitEnd = rabbit
    } else {
      numbers.rabbitEnd = null
    }
  }

  @Watch('avgValueEnd')
  onAvgValueEndChanged (value: string) {
    const avg = parseFloat(value)
    if (avg && !isNaN(avg)) {
      numbers.avgEnd = avg
    } else {
      numbers.avgEnd = null
    }
  }

  mounted () {
    const self = this as any
    Mousetrap.bind('return', () => self.start())
    this.loadData()
  }

  beforeDestroy (): void {
    Mousetrap.unbind('return')
  }

  start () {
    this.$router.push({ name: 'runningField' })
  }

  loadData () {
    this.startNumbers = numbers.start.join('\n')
    this.endNumbers = numbers.end.join('\n')
    this.rabbitValueStart = (numbers.rabbitStart || 0).toString()
    this.rabbitValueEnd = (numbers.rabbitEnd || 0).toString()
    this.avgValueStart = (numbers.avgStart || 0).toString()
    this.avgValueEnd = (numbers.avgEnd || 0).toString()
  }

  newWeek () {
    newWeek()
    this.loadData()
  }
}
</script>

<style lang="scss">
  .home {
    background-color: #1d540f;
    height: 1000px;
    padding-top: 20px;

    > div {
      background-color: rgba(255, 255, 255, 0.85);
      box-sizing: border-box;
      width: 800px;
      margin: auto;
      padding: 20px;
    }
  }
</style>
