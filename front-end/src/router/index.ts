import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginForm from "../views/login/LoginForm.vue";
import HomeUser from "../views/users/home/HomeUser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeUser,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
