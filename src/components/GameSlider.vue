<script setup lang="ts">
import type { Game } from '../types/Game';
import GameCard from '@/components/GameCard.vue';

defineProps<{
  title: string;
  games: Game[];
}>();
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold mb-4 dark:text-white">{{ title }}</h2>
    <div class="flex overflow-x-auto space-x-4 pb-4">
      <div 
        v-for="game in games" 
        :key="game.id" 
        class="shrink-0 w-72"
      >
        <GameCard :game="game" />
      </div>
      <div v-if="games.length === 0" class="text-gray-500 dark:text-gray-400">
        Memuat...
      </div>
    </div>
  </section>
</template>

<style scoped>
.overflow-x-auto::-webkit-scrollbar { display: none; }
.overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
</style>

