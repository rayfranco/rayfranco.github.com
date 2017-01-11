<template>
  <section>
    <blockquote>
      <h1>Life is life, na na, na nana.</h1>
    </blockquote>
  </section>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
section
  background-color #f4be51
blockquote
  align()
  &:before
  &:after
    font-family script
    font-size 18rem
    display inline-block
    position absolute
    opacity 0.3
  &:before
    content '“'
    top -9rem
    left -9rem
  &:after
    content '”'
    bottom -18rem
    right -9rem
</style>
