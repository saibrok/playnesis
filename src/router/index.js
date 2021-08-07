import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/episodes",
    name: "Episodes",
    component: () => import("../views/Episodes.vue"),
  },
  {
    path: "/characters",
    name: "Characters",
    component: () => import("../views/Characters.vue"),
  },
  {
    path: "/locations",
    name: "Locations",
    component: () => import("../views/Locations.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
