<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import { ref } from 'vue';
defineProps<{
  isOpen: boolean;
}>();

const isCategoryOpen = ref(false);

const categories = [
  { name: 'Action', slug: 'action', icon: '🔥' },
  { name: 'RPG', slug: 'role-playing-games-rpg', icon: '🔮' },
  { name: 'Strategy', slug: 'strategy', icon: '🧠' },
  { name: 'Shooter', slug: 'shooter', icon: '🎯' },
  { name: 'Puzzle', slug: 'puzzle', icon: '🧩' },
  { name: 'Indie', slug: 'indie', icon: '🕹️' },
];

const emit = defineEmits(['close']);
</script>

<template>
  <div 
    :class="isOpen ? 'block' : 'hidden'" 
    @click="emit('close')" 
    class="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
  ></div>

  <aside 
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg
           transform transition-transform duration-300 ease-in-out 
           md:translate-x-0 md:static md:inset-0
           dark:bg-black"
  >
    <div class="flex flex-col h-full">
      <!-- Header Sidebar (Logo) -->
      <div class="flex items-center flex-row px-6">
        <img src="../assets/Logo (1).png" class="w-20 h-20" alt="">

        <h1 class="text-2xl font-bold text-black dark:text-white">
          Game<span class="text-teal-500">Spot</span>
        </h1>
      </div>

      <hr class="border-gray-200 dark:border-gray-700 my-2 mx-4">

      <!-- Link Navigasi -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link 
            to="/" 
            class="group flex items-center px-3 py-2 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
            exact-active-class="bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
            @click="$emit('close')"
        >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>          
            <span class="ml-3">Home</span>
        </router-link>
        <router-link 
          to="/daftar-game" 
          @click="emit('close')"
          class="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100
                 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
          active-class="bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
        >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
            </svg>
            
          <span class="ml-3">Daftar Game</span>
        </router-link>
        
        <router-link 
          to="/favorites" 
          @click="emit('close')"
          class="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100
                 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
          active-class="bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
        >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          
          <span class="ml-3">Game Favorit</span>
        </router-link>
        <div>
            <button 
              @click="isCategoryOpen = !isCategoryOpen"
              class="w-full flex items-center justify-between px-3 py-3 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100
                     dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>      
                <div class="flex flex-row items-center justify-between gap-10">
                    <span class="ml-3">Kategori</span>
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>                      
                </div>            
              </div>
              <ChevronDownIcon 
                class="w-4 h-4 transition-transform duration-200"
                :class="isCategoryOpen ? 'rotate-180' : 'rotate-0'"
              />
            </button>
            
            <!-- Konten Dropdown (Sub-menu) -->
            <div v-if="isCategoryOpen" class="mt-1 pl-8 space-y-1">
              <router-link
                v-for="category in categories"
                :key="category.slug"
                :to="`/daftar-game?genre=${category.slug}`"
                @click="emit('close')"
                class="flex items-center px-3 py-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-50
                       dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 text-sm"
                active-class="bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
              >
                <span class="mr-2">{{ category.icon }}</span>
                <span>{{ category.name }}</span>
              </router-link>
            </div>
          </div>
      </nav>
    </div>
  </aside>
</template>
