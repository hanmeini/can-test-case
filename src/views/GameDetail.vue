<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useGameStore } from '../store/useGameStore';
import { useFavoriteStore } from '../store/useFavoriteStore';

const props = defineProps<{
  id: string; 
}>();

const gameStore = useGameStore();
const favoriteStore = useFavoriteStore();
const gameId = Number(props.id);

onMounted(() => {
  gameStore.fetchGameDetail(gameId);
});

const isFavorited = computed(() => {
  return favoriteStore.isGameFavorite(gameId);
});

const handleToggleFavorite = () => {
  if (gameStore.gameDetail) {
    favoriteStore.toggleFavorite(gameStore.gameDetail);
  }
};

</script>

<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">
    <router-link to="/" class="inline-block text-blue-600 hover:underline dark:text-blue-400 mb-4">
      &larr; Kembali ke Daftar Game
    </router-link>

    <div v-if="gameStore.isLoading" class="text-center py-20">
      <p class="text-lg font-semibold text-blue-600 dark:text-blue-400">Memuat detail game...</p>
    </div>

    <div v-else-if="gameStore.error" class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg" role="alert">
      <strong class="font-bold">Gagal memuat detail!</strong>
      <span class="block sm:inline"> {{ gameStore.error }}</span>
    </div>

    <div v-else-if="gameStore.gameDetail" class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
      
      <div class="relative h-64 sm:h-96 bg-gray-900 dark:bg-gray-900">
        <img 
          :src="gameStore.gameDetail.background_image" 
          :alt="gameStore.gameDetail.name" 
          class="w-full h-full object-cover opacity-70"
        />
        <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full flex justify-between items-end">
        <h1 class="text-3xl sm:text-5xl font-bold text-white shadow-lg">{{ gameStore.gameDetail.name }}</h1>
        
        <button
          @click="handleToggleFavorite"
          class="shrink-0 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          :class="isFavorited ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
        >
          {{ isFavorited ? '💔 Hapus dari Favorit' : '❤️ Tambah ke Favorit' }}
        </button>
      </div>
      </div>
      
      
      <div class="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-2">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Deskripsi</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ gameStore.gameDetail.description_raw }}
          </p>
        </div>
        
        <div class="md:col-span-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Detail</h3>
          
          <div class="space-y-3 text-sm">
            <div>
              <strong class="text-gray-800 dark:text-white">Rating:</strong> 
              <span class="font-bold text-yellow-600 dark:text-yellow-300 ml-1">{{ gameStore.gameDetail.rating }} / 5</span>
            </div>
            <div class="text-gray-800 dark:text-white">
              <strong>Dirilis:</strong> 
              <span class="ml-1">{{ gameStore.gameDetail.released }}</span>
            </div>
            <div>
              <strong class="text-gray-800 dark:text-white">Genre:</strong>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="g in gameStore.gameDetail.genres" :key="g.id" 
                      class="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {{ g.name }}
                </span>
              </div>
            </div>
            <div>
              <strong class="text-gray-800 dark:text-white">Platform:</strong>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="p in gameStore.gameDetail.platforms" :key="p.platform.id" 
                      class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {{ p.platform.name }}
                </span>
              </div>
            </div>
            <div v-if="gameStore.gameDetail.website">
              <strong class="text-gray-800 dark:text-white">Website:</strong> 
              <a :href="gameStore.gameDetail.website" target="_blank" rel="noopener noreferrer" 
                 class="ml-1 text-blue-600 dark:text-blue-400 hover:underline break-all">
                Kunjungi Situs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>