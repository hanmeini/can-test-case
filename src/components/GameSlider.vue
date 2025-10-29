<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Game } from '../types/Game';
import GameCard from './GameCard.vue';

defineProps<{
  title: string;
  games: Game[];
}>();

const sliderContainer = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeftStart = ref(0);

const handleMouseDown = (e: MouseEvent) => {
  if (!sliderContainer.value) return;
  isDragging.value = true;
  startX.value = e.pageX - sliderContainer.value.offsetLeft;
  scrollLeftStart.value = sliderContainer.value.scrollLeft;
  sliderContainer.value.style.cursor = 'grabbing';
  sliderContainer.value.style.scrollBehavior = 'auto'; 
};

const handleMouseLeave = () => {
  if (!sliderContainer.value) return;
  if (isDragging.value) {
    isDragging.value = false;
    sliderContainer.value.style.cursor = 'grab';
    sliderContainer.value.style.scrollBehavior = 'smooth';
  }
};

const handleMouseUp = () => {
  if (!sliderContainer.value) return;
  if (isDragging.value) {
    isDragging.value = false;
    sliderContainer.value.style.cursor = 'grab';
    sliderContainer.value.style.scrollBehavior = 'smooth';
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !sliderContainer.value) return;
  e.preventDefault();
  const x = e.pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startX.value) * 2; 
  sliderContainer.value.scrollLeft = scrollLeftStart.value - walk;
};

// --- Touch Events ---
const handleTouchStart = (e: TouchEvent) => {
  if (!sliderContainer.value) return;
  isDragging.value = true;
  startX.value = e.touches[0].pageX - sliderContainer.value.offsetLeft;
  scrollLeftStart.value = sliderContainer.value.scrollLeft;
   sliderContainer.value.style.scrollBehavior = 'auto';
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !sliderContainer.value) return;
  const x = e.touches[0].pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  sliderContainer.value.scrollLeft = scrollLeftStart.value - walk;
};

const handleTouchEnd = () => {
   if (!sliderContainer.value) return;
  if (isDragging.value) {
    isDragging.value = false;
     sliderContainer.value.style.scrollBehavior = 'smooth';
  }
};
onMounted(() => {
  const el = sliderContainer.value;
  if (el) {
    el.style.cursor = 'grab';
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
  }
});

// Hapus event listener saat komponen dihancurkan
onUnmounted(() => {
  const el = sliderContainer.value;
  if (el) {
    el.removeEventListener('mousedown', handleMouseDown);
    el.removeEventListener('mouseleave', handleMouseLeave);
    el.removeEventListener('mouseup', handleMouseUp);
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('touchstart', handleTouchStart);
    el.removeEventListener('touchmove', handleTouchMove);
    el.removeEventListener('touchend', handleTouchEnd);
  }
});

</script>

<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ title }}</h2>
    <div
      ref="sliderContainer"
      class="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide select-none"
      :class="{ 'cursor-grabbing': isDragging }"
       style="scroll-behavior: smooth;"
    >
      <div v-for="game in games" :key="game.id" class="shrink-0 w-64 sm:w-72">
        <GameCard :game="game" />
      </div>
      <div class="shrink-0 w-1"></div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

