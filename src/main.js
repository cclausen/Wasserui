/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
// router setup
import router from './routes/router'
import axios from 'axios'

dom.watch()
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(Vuex)

Vue.component('font-awesome-icon', FontAwesomeIcon)

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json'
  }
})
axiosInstance.interceptors.request.use(config => {
  config.headers.common['header1'] = 'authHeader()'
  return config
})
Vue.prototype.$http = axiosInstance

axios.defaults.withCredentials = true


/* eslint-disable no-new */
new Vue({ // NOSONAR we need a new here
  el: '#app',
  render: h => h(App),
  router,
  store
})
