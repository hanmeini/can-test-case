<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameStore } from '../store/useGameStore';
import Hero from '@/components/Hero.vue';
import GameSlider from '@/components/GameSlider.vue';

const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.topRatedGames.length === 0) {
    gameStore.fetchTopRatedGames();
  }
  if (gameStore.mostPlayedGames.length === 0) {
    gameStore.fetchMostPlayedGames();
  }
});
</script>

<template>
  <div class="container mx-auto sm:p-6 lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">
    <div class="h-[70vh] min-h-[300px] relative flex items-end justify-start text-center text-white overflow-hidden">

        <div class="absolute inset-0 z-0">
          <img src="../assets/heroimg.jpg" alt="Hero Background" class="w-full h-full object-cover object-center bg-center">
          <div class="absolute inset-0 bg-black opacity-20"></div>
        </div>
    
        <div class="relative justify-start items-start flex flex-col z-10 p-4">
          <h1 class="text-3xl text-left md:text-5xl font-extrabold mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)">
          Can Creative Game Database
          </h1>
          <p class="text-md text-left md:text-lg max-w-2xl mx-auto mb-8" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)">
            Temukan game rating tertinggi dan paling populer di bawah ini, atau jelajahi semua game.
          </p>
          
          <router-link 
            to="/daftar-game"
            class="bg-transparent text-white flex flex-row items-center gap-2 hover:text-black hover:border-black font-bold text-md hover:bg-white transition-colors duration-300 py-4 px-5 border border-white rounded-xl"
          >
            Explore All Games
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
              
          </router-link>
        </div>
      </div>

    <div class="container mx-auto p-4 sm:p-6 lg:p-8">

      <div v-if="gameStore.isSliderLoading" class="text-center py-10">
        <p class="text-lg dark:text-gray-300">Memuat game populer...</p>
      </div>
      <div v-else class="space-y-12">
        <GameSlider 
          title="Game Rating Tertinggi" 
          :games="gameStore.topRatedGames" 
        />
        <GameSlider 
          title="Paling Sering Dimainkan" 
          :games="gameStore.mostPlayedGames" 
        />
      </div>

    </div>
  </div>
</template>
