import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  data: {
  },
  template: '<App/>',
  components: { App },
})
