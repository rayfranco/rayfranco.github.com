<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import {init} from '../lib/Munsell'

export default {
  mounted () {
    // Init Munsell
    init(this.$refs.canvas)
  }
}
</script>

<style lang="stylus">
canvas
  opacity 0.8
  full()
</style>
