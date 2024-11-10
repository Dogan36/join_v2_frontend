import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StartView from '../views/StartView.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
  {path: '/', redirect: '/home' },
  {path: '/start', component: StartView},
  {path: '/home',component: HomeView,},
  {path: '/privacy',component: AboutView,},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
