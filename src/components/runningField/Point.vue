<template>
  <circle r="3" :cx="xPos" :cy="yPos" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Point',

  props: {
    xPos: { type: Number, required: true },
    yPos: { type: Number, required: true },
  },
})
</script>
