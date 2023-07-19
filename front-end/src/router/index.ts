import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginForm from "../views/login/LoginForm.vue";
import HomeUser from "../views/users/home/HomeUser.vue";
import SearchCenter from "../components/common/search-center/SearchCenter.vue";
import UserProfile from "../views/users/profile/UserProfile.vue";
import HomeMain from "@/views/admin/main/HomeMain.vue";
import DocumentListByType from "@/views/users/home/DocumentListByType.vue"

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
  {
    path: "/search",
    name: "search",
    component: SearchCenter,
  },
  {
    path: "/user/:id",
    name: "profile",
    component: UserProfile,
  },
  {
    path: "/dashboard",
    name: "dasboard",
    component: HomeMain,
  },
  {
    path: "/document-type/:id",
    name: "documentListByType",
    component: DocumentListByType,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.replace('/login');

export default router;
