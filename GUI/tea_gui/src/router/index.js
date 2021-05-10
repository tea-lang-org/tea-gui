import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Variables from "../views/Variables.vue"
import Study from "../views/Study.vue"
import Hypothesize from "../views/Hypothesize.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/variables",
    name: "Variables",
    component: Variables
  },
  {
    path: "/study_design",
    name: "Study",
    component: Study
  },
  {
    path: "/hypothesize",
    name: "Hypothesize",
    component: Hypothesize
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
