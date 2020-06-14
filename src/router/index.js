import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import store from '@/store/';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresLogin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const username = store.getters.getUsername;
  const password = store.getters.getPassword;
  const level = store.getters.getLevel;
  if (
    to.matched.some((record) => record.meta.requiresLogin)
    && (username === null || password === null || level === null)
  ) {
    next('/');
  } else {
    next();
  }
});
export default router;
