<template>
  <section class="SectionHome">
    <header>
      <h1>Franco Bouly</h1>
      <p>Digital Builder</p>
      <div class="links">
        <a href="http://twitter.com/rayfranco"><icon name="twitter"></icon></a>
        <a href="http://github.com/rayfranco"><icon name="github"></icon></a>
        <a href="mailto:fbouly@gmail.com"><icon name="email"></icon></a>
      </div>
    </header>
      <nav>
        <transition name="scaleup">
          <button @click="scrollToBottom" v-show="!projectView">Get in touch</button>
        </transition>
      </nav>
    <tail></tail>
  </section>
</template>

<script>
import Tail from './Tail'
import scrollTo from 'scroll-to'
import { mapGetters } from 'vuex'

export default {
  components: {
    tail: Tail
  },
  computed: {
    ...mapGetters([
      'projectView'
    ])
  },
  methods: {
    scrollToBottom () {
      let el = document.scrollingElement
      let to = el.scrollHeight - el.clientHeight
      let from = to - el.clientHeight > el.scrollTop
        ? to - el.clientHeight
        : el.scrollTop
      window.scrollTo(null, from) // Skip the document
      scrollTo(null, to, {
        duration: 600,
        ease: 'out-quart'
      })
    }
  }
}
</script>

<style lang="stylus">
section.SectionHome
  /*background url(https://squidpress.files.wordpress.com/2008/10/dsc_0006.jpg)*/
  background rgb(0, 145, 217)
  background-size cover
  background-position 50% 50%
  header
    align()
    color white
    text-align center
    z-index 5
    h1
      margin 0 0 3rem
      font(black)
      font-size 6em
      line-height 4.8rem
      text-transform uppercase
      white-space nowrap
    p
      font-size 4em
      margin 0
      font(serif)

    .links
      margin-top 10rem

    .icon
      fill white
      width 3.5rem
      height 3.5rem
      margin 0 .5rem
      opacity 0.5
      transition opacity 0.2s ease-out

      &:hover
        opacity 1

  nav
    position fixed
    top 5rem
    left calc(100vw - 5rem)
    transform translateX(-100%)
    white-space nowrap
    z-index 100
  button
    font(regular)
    font-size 1.6rem
    text-transform uppercase
    color white
    border 1px solid white
    border-radius 0.5rem
    padding 1rem 1.7rem
    opacity 0.3
    cursor pointer
    transform scale(1)
    transition all 0.6s ease-out-quart

    &:hover
      opacity 1

    &.scaleup-enter-active
    &.scaleup-leave-active
      opacity 0
      transform scale(0)

  canvas
    position absolute
    z-index 1
    cursor none
</style>
