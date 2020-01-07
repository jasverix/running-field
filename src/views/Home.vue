<template>
  <div class="home">
    <div>
      <VLayout>
        <VFlex>
          <VLabel>Måltall</VLabel>
          <VTextField type="number" v-model="rabbitValue" />
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex>
          <h2>Forrige uke</h2>
          <VTextarea v-model="startNumbers" rows="30" />
        </VFlex>

        <VFlex style="border-right: 1px solid; margin-right: 70px">
          &nbsp; &nbsp;
        </VFlex>

        <VFlex>
          <h2>Denne uka</h2>
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

export default {
  name: 'home',

  data () {
    return {
      startNumbers: '',
      endNumbers: '',
      rabbitValue: 0,
    }
  },

  watch: {
    startNumbers (value: string) {
      numbers.start = value.split('\n').map((line: string) => parseInt(line.trim())).filter(num => !isNaN(num) && num)
    },
    endNumbers (value: string) {
      numbers.end = value.split('\n').map((line: string) => parseInt(line.trim())).filter(num => !isNaN(num) && num)
    },
    rabbitValue (value: string) {
      const rabbit = parseFloat(value)
      if (rabbit && !isNaN(rabbit)) {
        numbers.rabbit = rabbit
      } else {
        numbers.rabbit = null
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
