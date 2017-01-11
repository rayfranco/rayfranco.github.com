/* eslint-disable no-unused-vars */
import Icon from 'bourgeon/Icon.vue'
import I18n from 'bourgeon/i18n'
import router from 'bourgeon/router'

export default {
  install (Vue, options) {
    Vue.use(I18n, options.locales)
    Vue.use(router)
    Vue.component('icon', Icon)
  }
}
