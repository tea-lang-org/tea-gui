import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Variables from "../views/Variables.vue"
import Study from "../views/Study.vue"

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
