import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import DetailsPage from '../components/DetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: DetailsPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
