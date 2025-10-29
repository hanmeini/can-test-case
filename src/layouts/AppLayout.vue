<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue'; 

const isSidebarOpen = ref(false);
</script>

<template>
  <div class="flex h-screen">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    <div class="flex-1 flex flex-col overflow-hidden bg-transparent relative">
      <header class="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-4 bg-white/30 dark:bg-black/30 bg-opacity-30 backdrop-blur-md border-b border-white/30 dark:border-gray-700 shadow-md md:hidden">
        
        <button @click="isSidebarOpen = true" class="p-2 rounded-md text-gray-600 dark:text-gray-300">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div class="flex items-center flex-row px-6">
          <img src="../assets/Logo (1).png" class="w-16 h-16" alt="">
        </div>
      </header>
    
      <main class="flex-1 overflow-x-hidden overflow-y-auto pt-16 md:pt-0 bg-gray-100 dark:bg-black">
        <router-view />
        <footer class="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 shadow-inner">
          <div class="container mx-auto px-6 py-10">
            <div class="flex flex-col md:flex-row md:justify-between gap-8 items-start justify-start text-left">
              <div class="w-full md:w-1/2 lg:w-1/3">
                <div class="flex items-center justify-start flex-row">
                  <img src="../assets/Logo (1).png" class="w-20 h-20" alt="">
          
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

