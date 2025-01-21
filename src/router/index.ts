import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StartView from '../views/StartView.vue';
import AboutView from '../views/AboutView.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import { currentUser } from '@/store/state';

// Beispiel: Token abrufen (z. B. aus localStorage oder composable)
function getToken() {
  return localStorage.getItem('join_token');
}

function getUser() {
  return localStorage.getItem('join_user') || null;
}
// Deine Routen
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/start', component: StartView, name: 'start' },
  { 
    path: '/home',
    component: HomeView,
    name: 'home',
    meta: { requiresAuth: true }
  },
  { path: '/privacy', component: AboutView },
  { path: '/reset-password/:uid/:token', component: ResetPassword },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 1) Definiere einen globalen "before each" Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = getToken();
    currentUser.value = getUser() || '';
    if (!token) {
      return next({ name: 'start' });
    }
  }
  next();
});

export default router;
