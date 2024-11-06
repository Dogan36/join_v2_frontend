import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StartView from '../views/StartView.vue';

const routes = [
  {path: '/', redirect: '/home' },
  {path: '/start', component: StartView},
  {path: '/home',component: HomeView,}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
