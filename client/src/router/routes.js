import { createWebHistory, createRouter } from "vue-router";
import Home from '/@/views/Home.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game/new",
    name: "NewGame",
    component: () => import('/@/views/NewGame.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;