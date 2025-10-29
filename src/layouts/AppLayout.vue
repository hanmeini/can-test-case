<script setup lang="ts">
import { ref } from 'vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import logoUrl from '../assets/Logo (1).png';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';

const route = useRoute();

const isSidebarOpen = ref(false);
const showCategories = ref(false);
const isSideNavOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const isActive = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};
</script>

<template>
  <div class="flex h-screen relative">
    <Sidebar :isOpen="isSideNavOpen" @close="isSideNavOpen = false" />
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <transition name="slide-left">
      <aside
        v-if="isSidebarOpen"
        class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-40 flex flex-col transform transition-transform duration-300"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-2">
            <img :src="logoUrl" class="w-12 h-12" alt="GameSpot Logo">
            <h1 class="text-2xl font-bold text-black dark:text-white">
              Game<span class="text-teal-500">Spot</span>
            </h1>
          </div>
          <button @click="closeSidebar" class="text-gray-600 dark:text-gray-300 hover:text-teal-500">
            <!-- Icon Close -->
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu List -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-3 text-gray-700 dark:text-gray-300">
          <transition-group name="fade-slide" tag="div">

            <!-- Home -->
            <router-link
              key="home"
              to="/"
              @click="closeSidebar"
              class="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-teal-100 dark:hover:bg-gray-800 transition-colors"
              exact-active-class="bg-teal-500 text-white"
            >
              <!-- Icon Home -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h4a1 1 0 001-1v-4h4v4a1 1 0 001 1h4a1 1 0 001-1V10" />
              </svg>
              Home
            </router-link>

            <!-- Daftar Game -->
            <router-link
              key="games"
              to="/daftar-game"
              @click="closeSidebar"
              class="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-teal-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-teal-500 text-white"
            >
              <!-- Icon Game Controller -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 21h8m-4-4v4m-7 0a9 9 0 1114 0H5z" />
              </svg>
              Daftar Game
            </router-link>

            <!-- Favorite -->
            <router-link
              key="favorite"
              to="/favorites"
              @click="closeSidebar"
              class="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-teal-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-teal-500 text-white"
            >
              <!-- Icon Heart -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z" />
              </svg>
              Favorite
            </router-link>

            <!-- Kategori -->
            <div key="kategori">
              <button
                @click="toggleCategories"
                class="w-full flex justify-between items-center py-2 px-3 rounded-md hover:bg-teal-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span class="flex items-center gap-3">
                  <!-- Icon Tag -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg>
                  Kategori
                </span>
                <svg
                  class="w-5 h-5 transition-transform duration-300"
                  :class="{ 'rotate-180': showCategories }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition name="dropdown-fade">
                <ul v-if="showCategories" class="ml-9 mt-2 space-y-2 text-sm">
                  <li><router-link to="/daftar-game?genre=action" @click="closeSidebar" class="block py-1 hover:text-teal-500">Action</router-link></li>
                  <li><router-link to="/daftar-game?genre=role-playing-games-rpg" @click="closeSidebar" class="block py-1 hover:text-teal-500">Adventure</router-link></li>
                  <li><router-link to="/daftar-game?genre=strategy" @click="closeSidebar" class="block py-1 hover:text-teal-500">RPG</router-link></li>
                  <li><router-link to="/daftar-game?genre=shooter" @click="closeSidebar" class="block py-1 hover:text-teal-500">Shooter</router-link></li>
                  <li><router-link to="/daftar-game?genre=puzzle" @click="closeSidebar" class="block py-1 hover:text-teal-500">Puzzle</router-link></li>
                  <li><router-link to="/daftar-game?genre=indie" @click="closeSidebar" class="block py-1 hover:text-teal-500">Indie</router-link></li>
                </ul>
              </transition>
            </div>

          </transition-group>
        </nav>
      </aside>
    </transition>

    <!-- Konten utama -->
    <div class="flex-1 flex flex-col overflow-hidden relative">
      <header
        class="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-4 
               bg-white/30 dark:bg-black/30 bg-opacity-30 backdrop-blur-md 
               border-b border-white/30 dark:border-gray-700 shadow-md lg:hidden"
      >
        <div class="flex items-center">
          <img :src="logoUrl" class="w-14 h-14" alt="GameSpot Logo" />
          <h1 class="text-2xl font-bold text-black dark:text-white">
            Game<span class="text-teal-500">Spot</span>
          </h1>
        </div>

        <button @click="toggleSidebar" class="p-2 rounded-md text-gray-600 dark:text-gray-300">
          <!-- Icon Menu -->
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black">
        <router-view />
                <footer class="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 shadow-inner">
          <div class="container mx-auto px-6 py-10">
            <div class="flex flex-col md:flex-row md:justify-between gap-8 items-start justify-start text-left">

              <div class="w-full md:w-1/2 lg:w-1/3">
                <div class="flex items-center justify-start flex-row">
                  <img :src="logoUrl" class="w-20 h-20" alt="GameSpot Logo">
                  <h1 class="text-2xl font-bold text-black dark:text-white">
                    Game<span class="text-teal-500">Spot</span>
                  </h1>
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Proyek Technical Assessment untuk Can Creative.
                </p>
                <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Data ditenagai oleh <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" class="hover:underline font-medium">RAWG.io API</a>.
                </p>
              </div>

              <div class="w-full md:w-1/4 lg:w-1/3 justify-start flex flex-col">
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3 uppercase tracking-wide">Navigasi</h3>
                <ul class="space-y-2 text-sm">
                  <li><router-link to="/" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</router-link></li>
                  <li><router-link to="/daftar-game" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Daftar Game</router-link></li>
                  <li><router-link to="/favorites" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Game Favorit</router-link></li>
                </ul>
              </div>

              <div class="w-full md:w-1/4 lg:w-1/3">
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3 uppercase tracking-wide">Tautan</h3>
                <ul class="space-y-2 text-sm">
                  <li><a href="" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">GitHub Repository</a></li>
                  <li><a href="" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">LinkedIn</a></li>
                </ul>
              </div>
            </div>

            <div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-left md:text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                &copy; 2025 Hanmeini. Dibuat dengan <span class="font-medium">Vue.js</span> & <span class="font-medium">Tailwind CSS</span>.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.3s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
