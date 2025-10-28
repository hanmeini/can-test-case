import { createRouter, createWebHistory } from 'vue-router';
import GamesList from '@/views/GamesList.vue'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GamesList',
      component: GamesList, 
    },
    {
      path: '/game/:id',
      name: 'GameDetail',
      component: () => import('@/views/GameDetail.vue'),
      props: true, 
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('@/views/Favorites.vue'),
    }
  ]
});

export default router;