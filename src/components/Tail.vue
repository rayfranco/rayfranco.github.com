<template>
  <canvas ref="tail"></canvas>
</template>

<script>
  import tail from '../lib/Tail'
  export default {
    mounted () {
      tail(this.$refs.tail)
    }
  }
</script>

<style lang="stylus" scoped>
canvas
  width 100%
  height 100%
</style>
