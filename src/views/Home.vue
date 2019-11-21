<template>
  <div class="home">
    <VLayout>
      <VFlex>
        <VTextarea v-model="startNumbers" />
      </VFlex>

      <VFlex>
        <VTextarea v-model="endNumbers" />
      </VFlex>
    </VLayout>
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
    }
  },

  watch: {
    startNumbers (value: string) {
      numbers.start = value.split('\n').map((line: string) => parseInt(line.trim())).filter(num => !isNaN(num) && num)
    },
    endNumbers (value: string) {
      numbers.end = value.split('\n').map((line: string) => parseInt(line.trim())).filter(num => !isNaN(num) && num)
    },
  },
}
</script>
