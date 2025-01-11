import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StartView from '../views/StartView.vue';
import AboutView from '../views/AboutView.vue';
import ResetPassword from '@/views/ResetPassword.vue';

const routes = [
  {path: '/', redirect: '/home' },
  {path: '/start', component: StartView, name: 'start'},
  {path: '/home',component: HomeView,},
  {path: '/privacy',component: AboutView,},
  {path: '/reset-password/:uid/:token', component: ResetPassword,},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
