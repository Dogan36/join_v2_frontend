import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './LoginView.vue';
import SummaryView from './SummaryView.vue';
import HomeView from './HomeView.vue';
import BoardView from './BoardView.vue';
import ContactsView from './ContactsView.vue';
import AddTaskView from './AddTaskView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/home',
    component: HomeView,
    children: [
      { path: 'summary', component: SummaryView },
      { path: 'board', component: BoardView },
      { path: 'addTask', component: AddTaskView},
      { path: 'contacts', component: ContactsView}
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
