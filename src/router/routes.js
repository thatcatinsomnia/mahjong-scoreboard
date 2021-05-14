import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios';
import setAuthorizationHeader from '/@/lib/setAuthorizationHeader';
import Home from '/@/views/Home.vue';

function isLoggedIn(to, from, next) {
  if (localStorage.getItem('accessToken')) {
    setAuthorizationHeader();
    next();
  } else {
    next({ name: 'Login' });
  }
}

function redirectToHomeIfLoggedIn(to, from, next) {
  if (localStorage.getItem('accessToken')) {
    next({ name: 'Home' });
  } else {
    next();
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
    component: () => import('/@/views/Login.vue'),
    beforeEnter: redirectToHomeIfLoggedIn
  },
  {
    path: "/game-records/new",
    name: "NewGameRecord",
    component: () => import('/@/views/NewGameRecord.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: "/game-records/:id/edit",
    name: "EditGameRecord",
    component: () => import('/@/views/EditGameRecord.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: "/game-records",
    name: "GameRecords",
    component: () => import('/@/views/GameRecord.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: '/preferences/new',
    name: 'NewPreference',
    component: () => import('/@/views/PrefCreate.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: '/preferences/:id',
    name: 'EditPreference',
    props: true,
    component: () => import('/@/views/PrefEdit.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: "/preferences",
    name: 'Preferences',
    component: () => import('/@/views/Prefs.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: "/card-type",
    name: 'CardType',
    component: () => import('/@/views/CardType.vue'),
    beforeEnter: isLoggedIn
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
});

axios.interceptors.response.use(res => {
  return res;
}, error => {

  // todo: check user not have permission or jwt expired
  if (error.response.status === 401) {
    router.replace({ name: 'Login' });
  }
  return Promise.reject(error);
});

export default router;