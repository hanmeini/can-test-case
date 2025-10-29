<script setup lang="ts">
import { useGameStore } from '../store/useGameStore';
import GameCard from '@/components/GameCard.vue'; 
import { onMounted, ref, watch } from 'vue';

// Inisialisasi store
const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.games.length === 0) {
    gameStore.fetchGames(1); 
  }
});

const localSearchQuery = ref('');

onMounted(() => {
  localSearchQuery.value = gameStore.searchQuery; 
  if (gameStore.games.length === 0) {
    gameStore.fetchGames(1);
  }
});

let searchTimeout: number;
watch(localSearchQuery, (newQuery) => {
  window.clearTimeout(searchTimeout); 
  searchTimeout = window.setTimeout(() => { 
    gameStore.setSearchQuery(newQuery); 
  }, 500);
});

//pagination
const changePage = (page: number) => {
  if (page >= 1 && page <= gameStore.totalPages) {
    gameStore.fetchGames(page);
    window.scrollTo(0, 0); 
  }
};
</script>

<template>
  <div class="container mx-auto sm:p-6 lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">
    <div class="h-[70vh] min-h-[300px] relative flex items-center justify-center text-center text-white overflow-hidden">

      <div class="absolute inset-0 z-0">
        <img src="../assets/image.png" alt="Hero Background" class="w-full h-full object-cover object-center bg-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <div class="relative justify-center items-center flex flex-col z-10 p-4">
          <h1 class="text-3xl text-center md:text-5xl font-extrabold mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)">
          Jelajahi Semua Game
          </h1>
          <p class="text-md text-center md:text-lg max-w-2xl mx-auto mb-8" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)">
            Temukan game rating tertinggi dan paling populer di bawah ini, atau jelajahi semua game.
          </p>
        </div>
        <div class="relative w-full max-w-lg mb-8">
          <!-- Ikon SVG (absolute di dalam div) -->
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          
          <!-- Input -->
          <input
          type="text"
          placeholder="Cari game (misal: GTA V)..."
          class="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white dark:text-gray-900 dark:placeholder-gray-400"
          v-model="localSearchQuery"
          @keyup.enter="$emit('search')"
        />
        </div>
      </div>
  
    </div>

    <div v-if="gameStore.isLoading" class="text-center py-20">
      <p class="text-lg font-semibold text-blue-600 dark:text-blue-400">Memuat data game...</p>
    </div>

    <div v-else-if="gameStore.error" class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg" role="alert">
      <strong class="font-bold">Terjadi Kesalahan!</strong>
      <span class="block sm:inline"> {{ gameStore.error }}</span>
    </div>

    <div v-else class="mt-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GameCard
          v-for="game in gameStore.games"
          :key="game.id"
          :game="game"
        />
      </div>

      <div class="flex justify-center items-center space-x-2 mt-10">
        <button 
          @click="changePage(gameStore.currentPage - 1)"
          :disabled="gameStore.currentPage === 1"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr; Sebelumnya
        </button>

        <span class="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg">
          Halaman {{ gameStore.currentPage }} / {{ gameStore.totalPages }}
        </span>

        <button 
          @click="changePage(gameStore.currentPage + 1)"
          :disabled="gameStore.currentPage === gameStore.totalPages || gameStore.totalCount === 0"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Selanjutnya &rarr;
        </button>
      </div>
    </div>
  </div>
</template>
