<template>
  <section id="contact">
    <article>
      <h1>Feel free...</h1>
      <p>
        to get in touch if you'd like to work with me or for any further information.
      </p>
      <p class="links">
        Send an <a href="mailto:bonjour@rayfran.co">email</a> or a <a href="https://twitter.com/messages/compose?recipient_id=11223602" target="_blank">tweet</a>.
      </p>
    </article>
    <foot></foot>
  </section>
</template>

<script>
import Footer from './Footer'
export default {
  components: {
    foot: Footer
  }
}
</script>

<style lang="stylus" scoped>
section
  background-color white
article
  align()
  text-align center
  h1
    font(bold)
    font-size 3.8em
    text-transform uppercase
  p
    font(serif)
    font-size 3em

    &.links
      font-size 2.4em
</style>
