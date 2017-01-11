<template>
  <button class="NavButton" :class="direction" :disabled="disabled" @click="$emit('click', $event)"></button>
</template>

<script>
  export default {
    props: ['direction', 'disabled']
  }
</script>

<style lang="stylus" scoped>
@keyframes buttonBeforeEnter
  from
    transform translate3d(-2rem, -100%, 0) rotate(-45deg)
    opacity 0
  to
    transform translate3d(0, 0, 0) rotate(-45deg)
    opacity 1

@keyframes buttonAfterEnter
  from
    transform translate3d(-2rem, 100%, 0) rotate(45deg)
    opacity 0
  to
    transform translate3d(0, 0, 0) rotate(45deg)
    opacity 1

button
  width 7rem
  height @width
  border 2px solid white
  border-radius @width
  position relative
  cursor pointer
  overflow hidden
  will-change opacity, transform
  opacity .99
  z-index 0

  // Scale-up transition
  &.prev
    transform rotate(180deg) scale(1) translateZ(0)
  &.next
    transform rotate(0) scale(1) translateZ(0)

  transition all 0.4s ease-out-expo
  transition-delay .5s

  &.scaleup-enter-active
  &.scaleup-leave-active
    opacity 0
    transition transform 0.6s ease-out-quad, opacity 0.2s ease-out-quad
    &.prev
      transform rotate(180deg) scale(0) translateZ(0)
    &.next
      transform rotate(0) scale(0) translateZ(0)

  &:disabled
    opacity 0.3
    border-color rgb(145, 145, 145)
    cursor default
    &:before
    &:after
      background rgb(145, 145, 145)
    &:hover:before
    &:hover:after
      opacity 1
      animation none

  &:before
  &:after
    content ''
    width 2px
    height 30%
    position absolute
    left 64%
    background white
    /*will-change opacity, transform*/
    translateZ(0)
    z-index 5
    display block
    pointer-events none
  &:before
    bottom 50%
    transform-origin 100% 100%
    transform translate(0, 0) rotate(-45deg)
    border-radius 1px
  &:after
    top 50%
    transform-origin 100% 0
    transform translate(0, 0) rotate(45deg)
    border-radius 1px

  &:hover
    &:before
    &:after
      opacity 0
    &:before
      animation buttonBeforeEnter 0.2s ease-out forwards
      animation-delay 0.1s
    &:after
      animation buttonAfterEnter 0.2s ease-out forwards
</style>
