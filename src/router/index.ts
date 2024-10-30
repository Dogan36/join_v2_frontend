import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SummaryView from '../views/SummaryView.vue';
import HomeView from '../views/HomeView.vue';
import BoardView from '../views/BoardView.vue';
import ContactsView from '../views/ContactsView.vue';
import AddTaskView from '../views/AddTaskView.vue';
import SignUpView from '../views/SignUpView.vue';
import ForgotPasswordView from '../views/forgotPasswordView.vue';
import StartView from '../views/StartView.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/start', component: StartView,
    children: [
      {path: '/login', component: LoginView},
      { path: '/', component: SummaryView },
      { path: 'signUp', component: SignUpView},
      { path: 'forgotPassword', component: ForgotPasswordView},
          ]
   },
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
