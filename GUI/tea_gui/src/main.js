import Vue from 'vue'
// import VuePapaParse from 'vue-papa-parse'
import "./plugins/bootstrap-vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

const store = Vue.observable({
  tea_file: {},
  tea_data: [],
  tea_vars: {},
  file_name: "None! Please input a file!"
})

const actions = {
  set_file(file) {
    store.tea_file = file
  },
  set_file_name(name) {
    store.file_name = name
  },
  set_tea_data(teaData) {
    store.tea_data = teaData
  },
  set_tea_variables(teaVariables) {
    store.tea_variables = teaVariables
  }
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
