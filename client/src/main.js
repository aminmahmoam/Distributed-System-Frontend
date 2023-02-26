import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BootstrapVue, IconsPlugin, LayoutPlugin, ModalPlugin, CardPlugin, VBScrollspyPlugin, DropdownPlugin, TablePlugin } from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker'

Vue.use(BootstrapVue)
Vue.use(datePicker)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(CardPlugin)
Vue.use(VBScrollspyPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.config.productionTip = false
Vue.use(require('vue-moment'))

Vue.filter('to-uppercase', function (value) {
  return value.toUpperCase()
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

