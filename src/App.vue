<template>
  <VApp>
    <VContent>
      <RouterView />
    </VContent>
  </VApp>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
})
</script>
