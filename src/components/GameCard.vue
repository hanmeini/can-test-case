<script setup lang="ts">
import { computed } from 'vue';
import type { Game } from '../types/Game'; 

const props = defineProps<{
  game: Game;
}>();

// computed property untuk mengambil tahun rilis saja
const releaseYear = computed(() => {
  return props.game.released ? new Date(props.game.released).getFullYear() : 'N/A';
});

// computed property untuk mengambil 3 genre pertama
const genres = computed(() => {
  return props.game.genres.map(g => g.name).slice(0, 3).join(', ');
});
</script>

<template>
  <router-link 
    :to="`/game/${game.id}`" 
    class="block group rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
  >
    <div class="h-48 w-full overflow-hidden">
      <img
        :src="game.background_image"
        :alt="game.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <div class="p-4">
      <h2 class="text-xl font-bold text-gray-900 truncate mb-2" :title="game.name">
        {{ game.name }}
      </h2>
      
      <div class="flex justify-between items-center text-sm mb-2">
        <span class="font-medium text-gray-700">Rilis: {{ releaseYear }}</span>
        <span class="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          ⭐ {{ game.rating }}
        </span>
      </div>

      <p class="text-xs text-gray-500 truncate" :title="genres">
        {{ genres }}
      </p>
    </div>
  </router-link>
</template>