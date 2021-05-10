import Vue from 'vue'
import "./plugins/bootstrap-vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

const store = Vue.observable({
  tea_file: null,
  tea_data: null,
  tea_vars: null,
  tea_study_design: null,
  tea_assumptions: null,
  tea_hypothesis: null,
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
    store.tea_vars = teaVariables
  },
  set_tea_study(studyDesign) {
    store.tea_study_design = studyDesign
  },
  set_tea_assumptions(assumptions) {
    store.tea_assumptions = assumptions
  },
  set_tea_hypothesis(hypothesis) {
    store.tea_hypothesis = hypothesis
  }
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
