<template>
  <VApp>
    <VContent>
      <div class="wrap">
        <RouterView />
      </div>
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

<style>
  body {
    overflow: hidden;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display:none;
  }

  .wrap {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
