<script setup lang="ts">
import { useFavoriteStore } from '../store/useFavoriteStore';
import GameCard from '@/components/GameCard.vue'; // Kita pakai lagi GameCard

// Inisialisasi store favorit
const favoriteStore = useFavoriteStore();
</script>

<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6">❤️ Game Favorit Saya</h1>

    <div 
      v-if="favoriteStore.favorites.length === 0" 
      class="text-center py-20 bg-white shadow rounded-lg"
    >
      <p class="text-lg text-gray-600 mb-4">Anda belum menambahkan game ke daftar favorit.</p>
      <router-link 
        to="/" 
        class="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
</template>