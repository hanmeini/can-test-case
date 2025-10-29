<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGameStore } from '../store/useGameStore';
import GameSlider from '@/components/GameSlider.vue';

const gameStore = useGameStore();
const isVisible = ref(false);

onMounted(() => {
  if (gameStore.topRatedGames.length === 0) {
    gameStore.fetchTopRatedGames();
  }
  if (gameStore.mostPlayedGames.length === 0) {
    gameStore.fetchMostPlayedGames();
  }

  // Munculkan animasi setelah mounted
  setTimeout(() => {
    isVisible.value = true;
  }, 150);
});
</script>

<template>
  <div class="mx-auto lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">
    <transition name="fade-slide" appear>
      <div
        v-if="isVisible"
        class="h-[70vh] min-h-[300px] relative flex items-end justify-start text-center text-white overflow-hidden"
      >
        <div class="absolute inset-0 z-0">
          <img
            src="../assets/heroimg.jpg"
            alt="Hero Background"
            class="w-full h-full object-cover object-center bg-center"
          />
          <div class="absolute inset-0 bg-black opacity-20"></div>
        </div>

        <div class="relative justify-start items-start flex flex-col z-10 p-4">
          <h1
            class="text-3xl text-left md:text-5xl font-extrabold mb-4"
            style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)"
          >
            Can Creative Game Database
          </h1>
          <p
            class="text-md text-left md:text-lg max-w-2xl mx-auto mb-8"
            style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)"
          >
            Temukan game rating tertinggi dan paling populer di bawah ini, atau jelajahi semua game.
          </p>

          <router-link
            to="/daftar-game"
            class="bg-transparent text-white flex flex-row items-center gap-2 hover:text-black hover:border-black font-bold text-md hover:bg-white transition-colors duration-300 py-4 px-5 border border-white rounded-xl"
          >
            Explore All Games
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </transition>

    <div class="container mx-auto p-4 sm:p-6 lg:p-8">
      <transition name="fade-slide" mode="out-in">
        <div v-if="!gameStore.isSliderLoading" key="content" class="space-y-12">
          <GameSlider title="Game Rating Tertinggi" :games="gameStore.topRatedGames" />
          <GameSlider title="Paling Sering Dimainkan" :games="gameStore.mostPlayedGames" />
        </div>

        <div v-else key="loading" class="animate-pulse space-y-12">
          <!-- Skeleton Loading -->
          <div v-for="i in 2" :key="i" class="space-y-4">
            <div class="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="n in 4"
                :key="n"
                class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <div class="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div class="p-4 space-y-3">
                  <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
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
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
