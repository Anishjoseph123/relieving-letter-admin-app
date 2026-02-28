import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'
import LoginForm from "@/views/MainPageComponents/LoginForm.vue";
import LandingPage from "@/views/MainPageComponents/LandingPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LoginForm,
  },
  {
    path: "/LandingPage",
    component: LandingPage,
    children: [
      {
        path: "/Organizations",
        name: "Organizations",
        component: () => import("@/views/ChildPages/OrganizationsList.vue"),
      },
      {
        path: "/UsersList",
        name: "UsersList",
        component: () => import("@/views/ChildPages/UsersList.vue"),
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
