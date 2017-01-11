import Vue from 'vue'
import Vuex from 'vuex'

import scrollTo from 'scroll-to'

Vue.use(Vuex)

const TYPE = {
  SET_PROJECT: 'SET_PROJECT'
}

const state = {
  project: null
}

const mutations = {
  [TYPE.SET_PROJECT] (state, project) {
    state.project = project
  }
}

const actions = {
  setProject ({ commit, state }, project) {
    if (project != null) {
      let top = project.$el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
      window.document.body.style.overflow = 'hidden'
      scrollTo(null, top, {
        ease: 'out-quart',
        duration: 600
      }).on('end', () => {
        project.active = true
      })
    } else {
      window.document.body.style.overflow = null
      state.project.active = false
    }
    commit(TYPE.SET_PROJECT, project)
  }
}

const getters = {
  projectView: ({ project }) => project && project.active
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
