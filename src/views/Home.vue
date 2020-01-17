<template>
  <div class="home">
    <div>
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

      <VBtn @click="$router.push({ name: 'runningField' })">
        Start
      </VBtn>
    </div>
  </div>
</template>

<script lang="ts">
import numbers from '@/store/numbers'

function parseNumbers (value: string): number[] {
  return value.split('\n')
    .map((line: string, index: number) => {
      return parseFloat(line.trim())
    })
    .filter(num => !isNaN(num) && num !== null && num !== void 0)
}

export default {
  name: 'home',

  data () {
    return {
      startNumbers: '',
      endNumbers: '',
      rabbitValueStart: 0,
      rabbitValueEnd: 0,
      avgValueStart: 0,
      avgValueEnd: 0,
    }
  },

  watch: {
    startNumbers (value: string) {
      numbers.start = parseNumbers(value)
    },
    endNumbers (value: string) {
      numbers.end = parseNumbers(value)
    },
    rabbitValueStart (value: string) {
      const rabbit = parseFloat(value)
      if (rabbit && !isNaN(rabbit)) {
        numbers.rabbitStart = rabbit
      } else {
        numbers.rabbitStart = null
      }
    },
    avgValueStart (value: string) {
      const avg = parseFloat(value)
      if (avg && !isNaN(avg)) {
        numbers.avgStart = avg
      } else {
        numbers.avgStart = null
      }
    },
    rabbitValueEnd (value: string) {
      const rabbit = parseFloat(value)
      if (rabbit && !isNaN(rabbit)) {
        numbers.rabbitEnd = rabbit
      } else {
        numbers.rabbitEnd = null
      }
    },
    avgValueEnd (value: string) {
      const avg = parseFloat(value)
      if (avg && !isNaN(avg)) {
        numbers.avgEnd = avg
      } else {
        numbers.avgEnd = null
      }
    },
  },
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
