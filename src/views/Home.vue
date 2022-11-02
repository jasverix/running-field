<template>
  <div class="home">
    <VLayout>
      <VFlex>
        <div style="height: 90vh" class="control-wrapper">
          <VLayout justify-center style="margin-bottom: 20px">
            <VBtn @click="newWeek">← Ny uke</VBtn>
          </VLayout>

          <VLayout>
            <VFlex>
              <h2>Forrige uke</h2>
              <VLabel>Måltall</VLabel>
              <VTextField type="number" v-model="rabbitValueStart" />

              <VLabel>Gjennomsnitt</VLabel>
              <VTextField type="number" v-model="avgValueStart" readonly />

              <div style="height: 45vh; overflow: hidden">
                <VLabel>Numre</VLabel>
                <div>
                  <textarea v-model="startNumbers" style="height: 40vh; width: 100%;" />
                </div>
              </div>
            </VFlex>

            <VFlex style="border-right: 1px solid; margin-right: 70px">
              &nbsp; &nbsp;
            </VFlex>

            <VFlex>
              <h2>Denne uka</h2>
              <VLabel>Måltall</VLabel>
              <VTextField type="number" v-model="rabbitValueEnd" />

              <VLabel>Gjennomsnitt</VLabel>
              <VTextField type="number" v-model="avgValueEnd" readonly />

              <div style="height: 45vh; overflow: hidden">
                <VLabel>Numre</VLabel>
                <div>
                  <textarea v-model="endNumbers" style="height: 40vh; width: 100%;" />
                </div>
              </div>
            </VFlex>
          </VLayout>

          <hr style="margin-bottom: 10px">

          <VBtn @click="start">
            Start
          </VBtn>
        </div>
      </VFlex>

      <VFlex>
        <div style="height: 90vh" class="user-manual">
          <h2>Bruksanvisning</h2>

          <p>
            I dette vinduet legger du inn tallene. Til venstre er start-posisjon og til høyre ny posisjon.
            Hver uke legger du inn nye tall. Knappen "Ny uke" vil flytte tallene fra høyre til venstre side.
            <strong>Merk at du da mister all informasjon på venstre side!</strong>
          </p>

          <h3>Inne på banen - hotkeys</h3>
          <ul>
            <li>space: start animasjon</li>
            <li>q: avslutt animasjon / resett posisjoner</li>
            <li>f: full-skjerm</li>
            <li>backspace: tilbake hit</li>
          </ul>
        </div>
      </VFlex>
    </VLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import numbers, { parseNumbers, newWeek, personToString } from '@/store/numbers'
import Mousetrap from 'mousetrap'

@Component
export default class Home extends Vue {
  public startNumbers: string = ''
  public endNumbers: string = ''
  public rabbitValueStart: string = ''
  public rabbitValueEnd: string = ''
  public avgValueStart: number | null = 0
  public avgValueEnd: number | null = 0

  @Watch('startNumbers')
  onStartNumbersChanged (value: string) {
    numbers.start = parseNumbers(value)
    this.avgValueStart = numbers.avgStart
  }

  @Watch('endNumbers')
  onEndNumbersChanged (value: string) {
    numbers.end = parseNumbers(value, numbers.start)
    this.avgValueEnd = numbers.avgEnd
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

  @Watch('rabbitValueEnd')
  onRabbitValueEndChanged (value: string) {
    const rabbit = parseFloat(value)
    if (rabbit && !isNaN(rabbit)) {
      numbers.rabbitEnd = rabbit
    } else {
      numbers.rabbitEnd = null
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
    this.startNumbers = numbers.start.map(personToString).join('\n')
    this.endNumbers = numbers.end.map(personToString).join('\n')
    this.rabbitValueStart = (numbers.rabbitStart || 0).toString()
    this.rabbitValueEnd = (numbers.rabbitEnd || 0).toString()
    this.avgValueStart = (numbers.avgStart || 0)
    this.avgValueEnd = (numbers.avgEnd || 0)
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
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .control-wrapper {
    width: 50vw;
  }

  .user-manual {
    width: 30vw;
  }

  > div {
    background-color: rgba(255, 255, 255, 0.85);
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
