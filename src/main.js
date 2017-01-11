// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Bourgeon from 'bourgeon'
import App from './App'

import store from 'store'

Vue.use(Bourgeon, {
  locales: ['fr', 'en']
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
