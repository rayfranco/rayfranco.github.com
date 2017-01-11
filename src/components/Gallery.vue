<template>
  <div class="Gallery" :class="{ active: active }">
    <div class="inner">
      <img :src="image" :class="side(index)" v-for="image, index in images">
    </div>
    <nav>
        <transition name="scaleup">
          <nav-button direction="prev" :disabled="!hasPrev" @click="prev" v-show="active"></nav-button>
        </transition>
        <transition name="scaleup">
          <nav-button direction="next" :disabled="!hasNext" @click="next" v-show="active"></nav-button>
        </transition>
    </nav>
  </div>
</template>

<script>
import NavButton from './NavButton'

var image = require.context('../assets/projects', true, /(jpg|png|gif)$/)

export default {
  props: ['project', 'active'],
  data () {
    return {
      current: 0
    }
  },
  computed: {
    images () {
      return this.sources.map((source) => image(source))
    },
    hasPrev () {
      return this.current > 0
    },
    hasNext () {
      return this.current < this.images.length - 1
    },
    sources () {
      return this.project.gallery
    }
  },
  methods: {
    visible (index) {
      return this.current === index
    },
    side (index) {
      return !this.visible(index) && (index < this.current ? 'left' : 'right')
    },
    prev () {
      this.current -= this.hasPrev ? 1 : 0
    },
    next () {
      console.log('next', this.hasNext)
      this.current += this.hasNext ? 1 : 0
    }
  },
  components: {
    'nav-button': NavButton
  }
}
</script>

<style lang="stylus">
.Gallery

  @keyframes clipLeft
    0%
      clip-path polygon(0 0, 200% 0, 100% 100%, 0 100%, 0 0)
    100%
      clip-path polygon(0 0, 0 0, 0 100%, 0 100%, 0 0)
  @keyframes clipRight
    0%
      clip-path polygon(-100% 0, 100% 0, 100% 100%, 0 100%, -100% 0)
    100%
      clip-path polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 100% 0)

  background grey

  .inner
    width 100%
    height 100%
    position relative
    /*overflow hidden*/

  img
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    object-fit cover
    clip-path clip-path polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)
    transform translateZ(0)
    backface-visibility hidden
    z-index 0
    &.left
      z-index 1
      animation clipLeft 0.5s ease-out-quart forwards
    &.right
      z-index 1
      animation clipRight 0.5s ease-out-quart forwards

  nav
    position absolute
    bottom 4rem
    right 4rem
    z-index 5

    button:last-child
      margin-left 2rem


</style>
