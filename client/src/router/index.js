import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import User from "@/components/User";
import Serie from "@/components/Series";
import InfoSerie from "@/components/InfoSerie";
import Ver from "@/components/Ver";
import AuthSuccess from "@/components/AuthSuccess";
import Auth from "@/components/Auth";
import firebase from "firebase";

Vue.use(Router);
let router = new Router({
  /* export default new Router({ */
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/series",
      name: "Series",
      component: Serie/* ,
      meta: { requiresAuth: true } */
    },
    { path: "/series/:slug", component: InfoSerie, name: "InfoSeries" },
    { path: "/ver/:slug", component: Ver, name: "Ver" },
    { path: "/auth", component: Auth },
    { path: "/success", component: AuthSuccess }
  ]
});
/* 
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('auth')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
}) */
export default router;
