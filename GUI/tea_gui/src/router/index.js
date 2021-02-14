import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Inputs from "../views/Inputs.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/inputs",
    name: "Inputs",
    component: Inputs
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
