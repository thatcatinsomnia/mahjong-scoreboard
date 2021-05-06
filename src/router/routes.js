import { createWebHistory, createRouter } from "vue-router";
import Home from '/@/views/Home.vue';

function isLoggedIn(to, from, next) {
  if (localStorage.jwt) {
    next();
  } else {
    next({ name: 'Login' });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: isLoggedIn
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('/@/views/Login.vue')
  },
  {
    path: "/game-records/new",
    name: "NewGameRecord",
    component: () => import('/@/views/NewGameRecord.vue')
  },
  {
    path: "/game-records/:id/edit",
    name: "EditGameRecord",
    component: () => import('/@/views/EditGameRecord.vue'),
  },
  {
    path: "/game-records",
    name: "GameRecords",
    component: () => import('/@/views/GameRecord.vue')
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
  scrollBehavior (to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
});

export default router;