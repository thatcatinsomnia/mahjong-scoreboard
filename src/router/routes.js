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
  },
  {
    path: '/preferences/new',
    name: 'NewPreference',
    component: () => import('/@/views/PrefDetail.vue'),
    props: {
      isEdit: false
    }
  },
  {
    path: '/preferences/:id',
    name: 'EditPreference',
    component: () => import('/@/views/PrefDetail.vue'),
    props: {
      isEdit: true
    }
  },
  {
    path: "/preferences",
    name: 'Preferences',
    component: () => import('/@/views/Prefs.vue')
  },
  {
    path: "/card-type",
    name: 'CardType',
    component: () => import('/@/views/CardType.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;