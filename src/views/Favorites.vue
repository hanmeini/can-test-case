<script setup lang="ts">
import { useFavoriteStore } from '../store/useFavoriteStore';
import GameCard from '@/components/GameCard.vue'; // Kita pakai lagi GameCard

// Inisialisasi store favorit
const favoriteStore = useFavoriteStore();
</script>

<template>
  <div class=" mx-auto lg:p-8 bg-white dark:bg-black min-h-screen transition-colors">
        <div class="h-[70vh] min-h-[300px] relative flex items-end justify-start text-left text-white overflow-hidden">

      <div class="absolute inset-0 z-0">
        <img src="../assets/favorites.png" alt="Hero Background" class="w-full h-full object-cover object-center bg-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div class="flex flex-row items-start justify-center">
        <div class="relative flex flex-col z-10 p-4">
          <div class="flex flex-row gap-5 items-start">
            <h1 class="text-3xl text-left md:text-5xl font-extrabold mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)">
            Game Favorit-Mu
            </h1>
            <div
            class="rounded-full hover:bg-white hover:text-black hover:border-black border bg-white/20 relative p-4 transform transition-transform duration-300 ease-out hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </div>
          </div>
          <p class="text-md text-left md:text-lg max-w-xl mx-auto mb-8" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)">
            Temukan game rating tertinggi dan paling populer di bawah ini, atau jelajahi semua game.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-4 sm:p-6 lg:p-8">

      <div 
        v-if="favoriteStore.favorites.length === 0" 
        class="text-center py-20 bg-white dark:bg-gray-800 shadow rounded-lg"
      >
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">Anda belum menambahkan game ke daftar favorit.</p>
        <router-link 
          to="/" 
          class="inline-block bg-blue-600 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          Cari Game Sekarang
        </router-link>
      </div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GameCard
          v-for="game in favoriteStore.favorites"
          :key="game.id"
          :game="game"
        />
      </div>
    </div>

  </div>
</template>