import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

const options = {
  persist: false
}
Vue.use(VueSession)
Vue.use(VueResource)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
