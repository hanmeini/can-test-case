import { useStorage, usePreferredDark } from '@vueuse/core';
import { watchEffect } from 'vue';

type Theme = 'light' | 'dark' | 'auto';

console.log('[useTheme] composable loaded');
// 'useStorage' 
const theme = useStorage<Theme>('my-theme-preference', 'auto');

const isSystemDark = usePreferredDark();

watchEffect(() => {
  const root = document.documentElement; 
  
  let effectiveTheme: 'light' | 'dark';

  if (theme.value === 'auto') {
    effectiveTheme = isSystemDark.value ? 'dark' : 'light';
  } else {
    effectiveTheme = theme.value;
  }

  console.log('Theme changed to:', effectiveTheme);

  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
});



/**
 * @description Composable untuk mengelola Light/Dark Mode
 */
export function useTheme() {
  return {
    theme, 
  };
}