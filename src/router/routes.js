import setAuthorizationHeader from '/@/lib/setAuthorizationHeader';
import { createWebHistory, createRouter, useRouter } from "vue-router";
import Home from '/@/views/Home.vue';

function isLoggedIn(to, from, next) {
  if (localStorage.jwt) {
    setAuthorizationHeader();
    next();
  } else {
    next({ name: 'Login' });
  }
}

function redirectToHomeIfLoggedIn(to, from, next) {
  if (localStorage.jwt) {
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
    component: () => import('/@/views/PrefDetail.vue'),
    beforeEnter: isLoggedIn,
    props: {
      isEdit: false
    }
  },
  {
    path: '/preferences/:id',
    name: 'EditPreference',
    component: () => import('/@/views/PrefDetail.vue'),
    beforeEnter: isLoggedIn,
    props: {
      isEdit: true
    }
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

export default router;