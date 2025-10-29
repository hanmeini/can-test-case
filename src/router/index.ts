import { createRouter, createWebHistory } from 'vue-router';
// 1. Impor Layout baru kita
import AppLayout from '../layouts/AppLayout.vue'; 
import GamesList from '../views/GamesList.vue';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '', 
          name: 'Home',
          component: Home,
        },
        {
          path: '/daftar-game', 
          name: 'GamesList',
          component: GamesList,
        },
        {
          path: 'game/:id',
          name: 'GameDetail',
          component: () => import('@/views/GameDetail.vue'),
          props: true,
        },
        {
          path: 'favorites', 
          name: 'Favorites',
          component: () => import('@/views/Favorites.vue'),
        }
      ]
    }
  ]
});

export default router;
