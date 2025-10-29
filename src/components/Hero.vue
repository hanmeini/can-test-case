<script setup lang="ts">


defineProps<{
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  heightClass: string;
}>();
</script>

<template>
  <div :class="[heightClass, 'relative flex items-center justify-center text-center text-white overflow-hidden min-h-screen']">

    <div class="absolute inset-0 z-0">
      <img src="../assets/heroimg.jpg" alt="Hero Background" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-black opacity-60"></div>
    </div>

    <div class="relative z-10 p-4">

      <h1 class="text-3xl md:text-5xl font-extrabold mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7)">
        {{ title }}
      </h1>
      <p class="text-md md:text-lg max-w-2xl mx-auto mb-8" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5)">
        {{ subtitle }}
      </p>
      
      <router-link 
        :to="buttonLink"
        class="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg
               hover:bg-blue-700 transition-colors duration-300
               dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {{ buttonText }}
      </router-link>
    </div>
  </div>
</template>

