<template>
  <section class="Project" :class="{ active, visible }" v-if="project">
    <transition
      name="splash"
      @before-leave="setContentVisible(true)"
      @after-enter="setContentVisible(false)"
    >
      <div class="splash" v-if="!active" :style="background" @click="toggle">
        <header>
          <h1 data-t>
            {{ project.title }}
            <span class="by">
              {{ project.by }}
            </span>
          </h1>
          <button data-t>open</button>
        </header>
      </div>
    </transition>
    <aside :style="background">
      <transition name="scaleup">
        <close @click="toggle" v-show="active"></close>
      </transition>
      <gallery :project="project" :active="active"></gallery>
    </aside>
    <article :style="{ backgroundColor: project.color }">
      <header>
        <p class="brand" data-t="1">{{ project.brand }}</p>
        <h1 data-t="2">{{ project.title }}</h1>
        <p class="by" data-t="3"><em>by</em> {{ project.by }}</p>
      </header>
      <div class="content">
        <p v-for="p in project.paragraphs" data-t="4">{{ p }}</p>
        <p v-for="(link, index) in project.links" :data-t="5 + index">
          <a :href="link.href">{{ link.text }}</a>
        </p>
      </div>
      <footer>
        <a :href="link" v-for="(link, icon, index) in project.awards"><icon :name="icon" :data-t="6 + index"></icon></a>
      </footer>
    </article>
  </section>
</template>

<script>
  import Gallery from './Gallery'
  import Close from './Close'
  import { mapActions } from 'vuex'

  var backgroundRequire = require.context('../assets/projects/', true, /.bg\.jpg$/)

  export default {
    props: ['project'],
    data () {
      return {
        active: false,
        visible: false
      }
    },
    computed: {
      background () {
        return {
          backgroundImage: `url(${backgroundRequire(this.project.background)})`
        }
      }
    },
    methods: {
      toggle () {
        this.setProject(this.active ? null : this)
      },
      setContentVisible (visible) {
        this.visible = visible
      },
      ...mapActions([
        'setProject'
      ])
    },
    components: {
      gallery: Gallery,
      close: Close
    }
  }
</script>

<style lang="stylus">
.Project
  overflow hidden

  articleWidth = 35em
  galleryWidth = (50vw - 4vw + 8vw)
  galleryHeight = (100vh - 40vh)
  galleryTop = 20vh
  galleryLeft = 4vw

  galleryPolygon = polygon(galleryLeft galleryTop, galleryLeft + galleryWidth galleryTop, galleryLeft + galleryWidth galleryTop + galleryHeight, galleryLeft galleryTop + galleryHeight, galleryLeft galleryTop)

  @keyframes splashToGallery
    from
      clip-path polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 0)
    to
      clip-path galleryPolygon

  @keyframes galleryToSplash
    from
      clip-path galleryPolygon
    to
      clip-path polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 0)

  @keyframes galleryToHide
    from
      clip-path galleryPolygon
    to
      clip-path polygon(
        galleryLeft galleryTop, galleryLeft galleryTop, galleryLeft galleryTop + galleryHeight, galleryLeft galleryTop + galleryHeight, galleryLeft galleryTop
      )

  @keyframes hideToGallery
    from
      clip-path polygon(
        galleryLeft galleryTop, galleryLeft galleryTop, galleryLeft galleryTop + galleryHeight, galleryLeft galleryTop + galleryHeight, galleryLeft galleryTop
      )
    to
      clip-path galleryPolygon

  &.active
    +above(bpMobile)
      position fixed
      z-index 30
      top 0
      left 0

  .splash
    fullscreen()
    cover()
    position absolute
    z-index 25
    &-leave-active
      animation splashToGallery 0.8s ease-out-quart, galleryToHide 0.5s ease-out-quart 0.8s forwards
    &-enter-active
      animation hideToGallery 0.5s ease-out-quart, galleryToSplash 0.8s ease-out-quart 0.5s forwards

    // trame
    &:after
      content ''
      position absolute
      fullscreen()
      background url(../assets/trame.png)
      z-index 0
      opacity 0.5
    header
      align()
      color white
      text-align center
      z-index 2

      > *
        transition all 0.8s ease-out-quad

      h1
        font(black)
        font-size 10rem
        margin 0 0 5rem
        .by
          display block
          font-size 3rem
          margin-top 2rem
          text-transform uppercase

      button
        position relative
        font(light)
        border 2px solid white
        width 10rem
        height @width
        border-radius @width
        color white
        font-size 2rem
        text-transform uppercase
        cursor pointer
        transform translateZ(0)

        &:after
          content ''
          position absolute
          top -2px
          left -2px
          width @width
          height @height
          border-radius @width
          background-color white
          transform scale(0)
          opacity 0
          transition transform 0.3s ease-out-expo, opacity 0.3s ease-out-quad
          z-index -1

        &:hover
          color black
          &:after
            opacity 1
            transform scale(1)

      ^[-1].splash-leave-active header
      ^[-1].splash-enter-active header
        [data-t]
          opacity 0
          for num in (1..5)
            &:nth-child({num})
              transform translate3d(num * -50px, 0, 0)
  aside
    width 50vw
    height 100vh
    position absolute
    top 0
    left 0
    z-index 2
    background-size cover
    background-position 50% 50%

    &:after
      content ''
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      background alpha(grey, 0.6)
      z-index -1

    .Gallery
      width galleryWidth
      height galleryHeight
      position absolute
      top galleryTop
      left galleryLeft

    .Close
      position absolute
      top 5vh
      left 4vw

  article
    position absolute
    width 50vw
    min-height 100vh
    box-sizing border-box
    padding 20vh 8vw 0 (8vw + 8vw)
    background-color black
    color white
    top 0
    right 0

    +above(bpMobile)
      // Transition
      [data-t]
        opacity 0
        transition all 0.8s
      for num in (1...10)
        [data-t=\"{num}\"]
          transform translate3d((num * 50)px, 0, 0)

      // .Project.active article
      ^[0].active ^[1..-1]
        // All subchilds
        [data-t]
          transition-delay .6s
          opacity 1
          transform translate3d(0, 0, 0)
    header
      p
        margin-top 0
        font-size 2rem
        &.brand
          font(black)
          font-size 2em
          color white
          text-transform uppercase
          margin-bottom 0
        &.by
          font(bold)
          color black
          font-size 1.8rem
          em
            font(serif)
      h1
        font(medium)
        text-transform uppercase
        font-size 5.8rem
        margin 0.3rem

    .content
      p
        font(light)
        font-size 1.8em
        line-height 3rem

    footer
      .icon
        width 8rem
        height 4rem
        fill white
        margin 0 1rem

  +below(bpMobile)
    height auto
    position relative

    .splash
      display none

    aside
      height calc(100vw / 16 * 9)

    article
      height auto
      padding 8vw

    aside
    article
      width 100vw
      min-height 30vh
      position relative
      display block
    aside
      .Gallery
        width 100%
        height 100%
        top 0
        left 0

  +above(bpMobile)
    /*&:not(.visible)*/
      /*aside*/
      /*article*/
        /*display none*/

    aside
      .Gallery
        nav
          bottom auto
          top calc(100% + 10vh)
          right calc(8vw + 4vw)
          transform translate(0, -50%)
    article
      footer
        width 50vw - 8vw - 4vw
        position absolute
        display block
        top 10vh
        right 50vw + 8vw
        z-index 5
        text-align right

        a
          opacity 0.3
          transition opacity 0.3s ease-out
          transform translateZ(0)
          display inline-block
          will-change opacity
          overflow hidden
          &:hover
            opacity 1
</style>
