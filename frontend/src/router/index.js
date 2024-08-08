import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import LandingView from '../views/LandingView.vue'

const routes = [
  {
    path: '/',
    name: 'landing_page',
    component: LandingView
  },
  {
    path: '/u/:userId',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const storedId = localStorage.getItem('id');
      const routeId = to.params.userId;
      if (storedId && storedId === routeId) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('userRole');
      if (role === 'admin') {
        next();
      } else {
        next('/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (to.name === 'login' && isAuthenticated) {
    if (userRole === 'admin') {
      next('/admin');
    } else if (userRole === 'user') {
      const userId = localStorage.getItem('id');
      next({ name: 'home', params: { userId } });
    } else {
      next('/');
    }
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
