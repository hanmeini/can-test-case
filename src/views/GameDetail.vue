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
  if (gameStore.gameDetail?.id !== gameId) {
    gameStore.fetchGameDetail(gameId);
  }
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
  <div class="container mt-20 lg:mt-auto mx-auto p-4 sm:p-6 lg:p-8 min-h-screen transition-colors">
    <router-link to="/daftar-game" class="inline-block text-blue-600 hover:underline dark:text-blue-400 mb-4">
      &larr; Kembali ke Daftar Game
    </router-link>

    <!-- SKELETON LOADING -->
    <div v-if="gameStore.isLoading" class="animate-pulse">

      <div class="h-64 sm:h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      
      <div class="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="md:col-span-2 space-y-4">
          <div class="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        <div class="md:col-span-1 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <div class="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="flex flex-wrap gap-2">
            <div class="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div class="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div class="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="gameStore.error" class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg" role="alert">
      <strong class="font-bold">Gagal memuat detail!</strong>
      <span class="block sm:inline"> {{ gameStore.error }}</span>
    </div>

    <div v-else-if="gameStore.gameDetail">
      
      <!-- Header Gambar & Tombol Favorit -->
      <div class="relative h-64 sm:h-96 bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden">
        <img 
          :src="gameStore.gameDetail.background_image" 
          :alt="gameStore.gameDetail.name" 
          class="w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent"></div>
        
        <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full flex justify-between items-end">
          <h1 class="text-3xl sm:text-5xl font-bold text-white" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
            {{ gameStore.gameDetail.name }}
          </h1>
          
          <button
            @click="handleToggleFavorite"
            class="shrink-0 font-semibold md:py-2 py-1 md:px-4 px-2 rounded-lg shadow-md border-2 transition-all duration-300 group"
            :class="isFavorited ? 'bg-white hover:bg-gray-100 text-gray-900 border-white' : 'bg-white/20 hover:bg-white text-white hover:text-gray-900 border-white '"
          >
            <span v-if="isFavorited" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mr-2">
                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
              </svg>
              Hapus dari Favorit
            </span>
            <span v-else class="flex items-center">
              <!-- PERBAIKAN SINTAKS SVG: strokeWidth -> stroke-width, dll. -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 group-hover:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mr-2 hidden group-hover:block">
                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
              </svg>
              Tambah ke Favorit
            </span>
          </button>
        </div>
      </div>
      
      <!-- Konten Grid (Sidebar Detail tetap menggunakan card) -->
      <div class="p-0 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        
        <div class="md:col-span-2">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Deskripsi</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ gameStore.gameDetail.description_raw }}
          </p>
        </div>
        
        <div class="md:col-span-1 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md h-fit">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Detail</h3>
          
          <!-- Layout baru dengan ikon -->
          <div class="space-y-5 text-sm">

            <!-- Rating -->
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 shrink-0 text-gray-500 dark:text-gray-400 mr-2.5 mt-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <div>
                <strong class="text-gray-800 dark:text-white">Rating:</strong> 
                <span class="font-semibold text-yellow-600 dark:text-yellow-400 ml-1">{{ gameStore.gameDetail.rating }} / 5</span>
              </div>
            </div>

            <!-- Dirilis -->
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 shrink-0 text-gray-500 dark:text-gray-400 mr-2.5">
                <path fill-rule="evenodd" d="M5.25 2.25A2.25 2.25 0 0 0 3 4.5v15A2.25 2.25 0 0 0 5.25 21.75h13.5A2.25 2.25 0 0 0 21 19.5V4.5A2.25 2.25 0 0 0 18.75 2.25H5.25ZM6 4.5h12V6H6V4.5ZM6 7.5h12v12H6V7.5Z" clip-rule="evenodd" />
                <path d="M10.125 10.125a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z" />
                <path d="M15.375 10.125a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z" />
              </svg>
              <div class="text-gray-800 dark:text-white">
                <strong>Dirilis:</strong> 
                <span class="ml-1 text-gray-700 dark:text-gray-300">{{ gameStore.gameDetail.released }}</span>
              </div>
            </div>

            <!-- Genre -->
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 shrink-0 text-gray-500 dark:text-gray-400 mr-2.5 mt-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>

              <div>
                <strong class="text-gray-800 dark:text-white">Genre:</strong>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="g in gameStore.gameDetail.genres" :key="g.id" 
                        class="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {{ g.name }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Platform -->
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 shrink-0 text-gray-500 dark:text-gray-400 mr-2.5 mt-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
              </svg>

              <div>
                <strong class="text-gray-800 dark:text-white">Platform:</strong>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="p in gameStore.gameDetail.platforms" :key="p.platform.id" 
                        class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {{ p.platform.name }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Website -->
            <div v-if="gameStore.gameDetail.website" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 shrink-0 text-gray-500 dark:text-gray-400 mr-2.5 mt-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>

              <div>
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
  </div>
</template>
