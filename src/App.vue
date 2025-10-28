<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-10">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <router-link 
          to="/" 
          class="text-2xl font-bold text-blue-600"
          @click="closeMobileMenu"
        >
          RAWG Games
        </router-link>

        <div class="hidden md:flex space-x-4">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
            active-class="text-blue-600 bg-blue-50"
          >
            Home
          </router-link>
          <router-link 
            to="/favorites" 
            class="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
            active-class="text-blue-600 bg-blue-50"
          >
            Favorit
          </router-link>
        </div>

        <div class="md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        :class="isMobileMenuOpen ? 'block' : 'hidden'" 
        class="md:hidden pb-3"
      >
        <router-link 
          to="/" 
          class="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium px-3 py-2 rounded-md"
          active-class="text-blue-600 bg-blue-50"
          @click="closeMobileMenu"
        >
          Home
        </router-link>
        <router-link 
          to="/favorites" 
          class="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium px-3 py-2 rounded-md"
          active-class="text-blue-600 bg-blue-50"
          @click="closeMobileMenu"
        >
          Favorit
        </router-link>
      </div>
    </nav>
  </header>

  <main class="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
    <router-view />
  </main>
</template>