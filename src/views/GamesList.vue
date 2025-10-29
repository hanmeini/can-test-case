<script setup lang="ts">
import { useGameStore } from '../store/useGameStore';
import GameCard from '@/components/GameCard.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'; 

const gameStore = useGameStore();
const route = useRoute(); 

// State lokal untuk search
const localSearchQuery = ref('');

const fetchDataForRoute = (genreSlug: string | null) => {

  gameStore.fetchGames(1, genreSlug); 
  localSearchQuery.value = '';
  gameStore.searchQuery = '';
};

onMounted(() => {
  const initialGenre = route.query.genre ? String(route.query.genre) : null;
  fetchDataForRoute(initialGenre);
  localSearchQuery.value = gameStore.searchQuery;
});

onBeforeRouteUpdate((to, from) => {
  if (to.query.genre !== from.query.genre) {
    const newGenre = to.query.genre ? String(to.query.genre) : null;
    fetchDataForRoute(newGenre);
  }
});


let searchTimeout: number;
watch(localSearchQuery, (newQuery) => {
  window.clearTimeout(searchTimeout);
  searchTimeout = window.setTimeout(() => {
    gameStore.setSearchQuery(newQuery);
  }, 500);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= gameStore.totalPages) {
    gameStore.fetchGames(page, gameStore.genreSlug);
    window.scrollTo(0, 0);
  }
};
const pageTitle = computed(() => {
  if (gameStore.genreSlug) {
    const genreName = gameStore.genreSlug
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
    return `Kategori: ${genreName}`;
  }
  return 'Jelajahi Semua Game';
});


</script>

<template>
  <div class="mx-auto lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">

    <!-- Hero Section -->
    <div class="h-[70vh] min-h-[300px] relative flex items-center justify-center text-center text-white overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="../assets/gamelist.png" alt="Hero Background" class="w-full h-full object-cover object-center bg-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <transition name="fade-slide">
        <div class="flex flex-col items-center justify-center z-10" v-if="!gameStore.isLoading">
          <div class="relative justify-center items-center flex flex-col p-4">
            <h1 class="text-3xl text-center md:text-5xl font-extrabold mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)">
              {{ pageTitle }}
            </h1>
            <p class="text-md text-center md:text-lg max-w-2xl mx-auto mb-8" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)">
              Temukan game rating tertinggi dan paling populer di bawah ini, atau jelajahi semua game.
            </p>
          </div>

          <div class="relative w-full max-w-lg mb-8 px-4 sm:px-0">
            <div class="absolute inset-y-0 left-3 md:-left-3 pl-3.5 sm:pl-7 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari game (misal: GTA V)..."
              class="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-white bg-white text-gray-900 dark:text-gray-900 dark:placeholder-gray-900 transition-all duration-300"
              v-model="localSearchQuery"
            />
          </div>
        </div>
      </transition>
    </div>

    <!-- Daftar Game -->
    <div class="container mx-auto p-4 sm:p-6 lg:p-8">
      <transition name="fade-slide" mode="out-in">
      <div v-if="gameStore.isLoading" class="animate-pulse">
         <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           <div v-for="n in 8" :key="n" class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
             <div class="h-48 bg-gray-300 dark:bg-gray-700"></div>
             <div class="p-4 space-y-3">
               <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
               <div class="flex justify-between items-center">
                 <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                 <div class="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
               </div>
               <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
             </div>
           </div>
         </div>
         <!-- Skeleton Pagination -->
          <div class="sticky bottom-0 z-10 mt-10 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
           <div class="container mx-auto flex items-center justify-between px-4">
            <div class="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div class="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div class="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
           </div>
          </div>
      </div>

        <div v-else-if="gameStore.error" key="error" class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
          <strong class="font-bold">Terjadi Kesalahan!</strong>
          <span class="block sm:inline"> {{ gameStore.error }}</span>
        </div>

        <div v-else key="games" class="mt-5">
          <transition-group name="fade-slide" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <GameCard
              v-for="game in gameStore.games"
              :key="game.id"
              :game="game"
            />
          </transition-group>

          <!-- Pagination -->
          <transition name="fade-slide">
            <div
              v-if="gameStore.totalPages > 1"
              class="sticky bottom-0 z-10 mt-10 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
            >
              <div class="container mx-auto flex items-center justify-between px-4">
                <button @click="changePage(gameStore.currentPage - 1)" :disabled="gameStore.currentPage === 1"
                        class="flex items-center gap-1 px-4 py-2 bg-teal-200 dark:bg-teal-800 dark:text-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  <span class="hidden sm:inline">Sebelumnya</span>
                </button>

                <span class="px-4 py-2 bg-teal-500 dark:bg-teal-700 text-white rounded-lg text-sm font-medium">
                  {{ gameStore.currentPage }} / {{ gameStore.totalPages }}
                </span>

                <button @click="changePage(gameStore.currentPage + 1)"
                        :disabled="gameStore.currentPage === gameStore.totalPages || gameStore.totalCount === 0"
                        class="flex items-center gap-1 px-4 py-2 bg-teal-200 dark:bg-teal-800 dark:text-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                  <span class="hidden sm:inline">Selanjutnya</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


