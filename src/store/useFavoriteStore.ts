import { defineStore } from 'pinia';
import type { Game } from '../types/Game';

//unique key localdata
const FAVORITES_LS_KEY = 'myFavoriteGames';

/**
 * @description Mengambil data favorit dari Local Storage saat store pertama kali dimuat.
 */
function getFavoritesFromLocalStorage(): Game[] {
  const data = localStorage.getItem(FAVORITES_LS_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Game[];
    } catch (e) {
      console.error('Gagal parse data favorit dari Local Storage', e);
      return [];
    }
  }
  return [];
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: getFavoritesFromLocalStorage(),
  }),

  getters: {
    /**
     * @description Getter untuk mengecek apakah sebuah game sudah ada di favorit
     */
    isGameFavorite: (state) => {
      return (gameId: number): boolean => {
        return state.favorites.some(game => game.id === gameId);
      };
    },
  },

  actions: {
    /**
     * @description save state to localstorage
     */
    _saveToLocalStorage() {
      localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(this.favorites));
    },

    /**
     * @description add favorite
     */
    toggleFavorite(game: Game) {
      // Cek apakah game sudah ada
      const gameIndex = this.favorites.findIndex(g => g.id === game.id);

      if (gameIndex === -1) {
        const simpleGameData: Game = {
          id: game.id,
          name: game.name,
          slug: game.slug,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms: game.platforms,
          genres: game.genres,
        };
        this.favorites.push(simpleGameData);
      } else {

        this.favorites.splice(gameIndex, 1);
      }
      this._saveToLocalStorage();
    },
  },
});