<template>
  <button class="Close" @click="onClick"></button>
</template>

<script>
export default {
  methods: {
    onClick () {
      this.$emit('click', this.$event)
    }
  }
}
</script>

<style lang="stylus" scoped>
buttonSize = 3.5rem

@keyframes closeIn
  0%
    transform translate3d(0,0,0) rotate(45deg)
    opacity 1
  49%
    transform translate3d(buttonSize, - buttonSize, 0) rotate(45deg)
    opacity 0
  51%
    transform translate3d(- buttonSize, buttonSize, 0) rotate(45deg)
    opacity 0
  100%
    transform translate3d(0, 0, 0) rotate(45deg)

@keyframes closeOut
  0%
    transform translate3d(0,0,0) rotate(-45deg)
    opacity 1
  49%
    transform translate3d(buttonSize, buttonSize, 0) rotate(-45deg)
    opacity 0
  51%
    transform translate3d(- buttonSize, - buttonSize, 0) rotate(-45deg)
    opacity 0
  100%
    transform translate3d(0, 0, 0) rotate(-45deg)


button
  width buttonSize
  height @width
  border 0
  cursor pointer
  transform scale(1) translateZ(0)
  overflow hidden

  transition all 0.4s ease-out-expo
  transition-delay .5s

  &.scaleup-enter-active
  &.scaleup-leave-active
    transition transform 0.6s ease-out-quad, opacity 0.2s ease-out-quad
    transform scale(0) translateZ(0)
    opacity 0


  &:hover
    color blue
    &:before
      animation closeOut 0.4s
    &:after
      animation closeIn 0.4s

  &:before
  &:after
    content ''
    position absolute
    top 0
    left 50%
    background white
    width 2px
    height 100%
    display inline-block
    border-radius 1px
    will-change transform
    transform translateZ(0)
    backface-visibility hidden
  &:before
    transform rotate(-45deg) translateZ(0)
  &:after
    transform rotate(45deg) translateZ(0)
</style>
