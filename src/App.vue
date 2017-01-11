<template>
  <div id="app">
    <home></home>
    <project v-for="data in projects" :project="data"></project>
    <contact></contact>
  </div>
</template>

<script>
import SectionHome from './components/SectionHome'
import SectionProject from './components/SectionProject'
import SectionQuote from './components/SectionQuote'
import SectionContact from './components/SectionContact'

import Footer from './components/Footer'

import projects from './data/projects.yml'

export default {
  data: () => ({
    projects
  }),
  components: {
    home: SectionHome,
    project: SectionProject,
    quote: SectionQuote,
    contact: SectionContact,
    foot: Footer
  }
}
</script>

<style lang="stylus">
@import "../node_modules/normalize.css/normalize.css"

html
  font-size 62.5%

body
  position absolute
  min-width 100vw
  height 100vh
  overflow-x hidden
  overflow-y scroll

  +below(bpMobile)
    overflow-y inherit!important

#app
  width 100vw
  height 100vh

::-webkit-scrollbar
  position absolute
  width 1rem

::-webkit-scrollbar-track
  opacity 0.2
  background alpha(black, 0.1)

::-webkit-scrollbar-thumb
  background alpha(black, 0.3)

a
  color black
  &[href^="https://twitter"]
    color twitterBlue

button
  background transparent
  &:active
  &:focus
    outline none

section
  width 100vw
  height 100vh
  background grey
  position relative
</style>
