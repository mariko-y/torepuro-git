import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import register from "../views/register.vue";
import mainpage from "../views/MainPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: login },
  { path: "/register", component: register },
  { path: "/mainpage/:userName", props:true, component: mainpage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
