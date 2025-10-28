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
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Database Game</h1>  
      <input
        type="text"
        placeholder="Cari game (misal: GTA V)..."
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="localSearchQuery" 
      />
    </div>

    <div v-if="gameStore.isLoading" class="text-center py-20">
      <p class="text-lg font-semibold text-blue-600">Memuat data game...</p>
      </div>

    <div v-else-if="gameStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
      <strong class="font-bold">Terjadi Kesalahan!</strong>
      <span class="block sm:inline"> {{ gameStore.error }}</span>
    </div>

    <div v-else>
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
        class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &larr; Sebelumnya
      </button>

      <span class="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Halaman {{ gameStore.currentPage }} / {{ gameStore.totalPages }}
      </span>

      <button 
        @click="changePage(gameStore.currentPage + 1)"
        :disabled="gameStore.currentPage === gameStore.totalPages || gameStore.totalCount === 0"
        class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Selanjutnya &rarr;
      </button>
    </div>
    </div>
  </div>
</template>
