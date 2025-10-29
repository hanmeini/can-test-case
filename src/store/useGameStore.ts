import { defineStore } from 'pinia';
import axios from 'axios';
import { RAWG_BASE_URL, RAWG_API_KEY } from '../constants/api';
import type { Game, GameDetail, GameListResponse } from '../types/Game';

interface GameState {
  games: Game[];
  gameDetail: GameDetail | null;
  topRatedGames: Game[]; 
  mostPlayedGames: Game[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  searchQuery: string;
  genreSlug: string | null;
  isLoading: boolean;
  isSliderLoading: boolean;
  error: string | null;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    games: [],
    gameDetail: null,
    topRatedGames: [],
    mostPlayedGames: [],
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    searchQuery: '',
    genreSlug: null,
    isLoading: false,
    isSliderLoading: false,
    error: null,
  }),

  getters: {
    totalPages(state): number {
      if (state.totalCount === 0 || state.pageSize === 0) return 1;
      return Math.ceil(state.totalCount / state.pageSize);
    },
  },

  actions: {
    /**
     * @description )
     * @param {number} page 
     * @param {string | null} [genre=null]
     */
    async fetchGames(page: number, genre: string | null = null) {
      this.isLoading = true;
      this.error = null;
      this.currentPage = page;
      this.genreSlug = genre || null;

      try {
        const params = new URLSearchParams({
          key: RAWG_API_KEY,
          page: String(page),
          page_size: String(this.pageSize),
        });

        // Search query
        if (this.searchQuery.trim() !== '') {
          params.append('search', this.searchQuery.trim());
        }

        // Genre filter
        if (genre && genre !== 'all') {
          params.append('genres', genre);
        }

        const url = `${RAWG_BASE_URL}/games?${params.toString()}`;
        console.log('[DEBUG] Fetching games from:', url);

        const response = await axios.get<GameListResponse>(url);

        this.games = response.data.results;
        this.totalCount = response.data.count;

      } catch (err) {
        this.error = 'Gagal mengambil data game. Cek koneksi atau API Key Anda.';
        console.error(err);
        this.games = [];
        this.totalCount = 0;
      } finally {
        this.isLoading = false;
      }
    },


    /**
     * @description Mengatur query pencarian
     */
    async setSearchQuery(query: string) {
      this.searchQuery = query;
      await this.fetchGames(1, this.genreSlug); 
    },

    async fetchTopRatedGames() {
      if (this.topRatedGames.length > 0) return;
      this.isSliderLoading = true;
      try {
        const params = new URLSearchParams({
          key: RAWG_API_KEY,
          ordering: '-rating', 
          page_size: '10',
        });
        const url = `${RAWG_BASE_URL}/games?${params.toString()}`;
        const response = await axios.get<GameListResponse>(url);
        this.topRatedGames = response.data.results;
      } catch (err) {
        console.error('Gagal fetch top rated games:', err);
      } finally {
        this.isSliderLoading = false;
      }
    },

    async fetchMostPlayedGames() {
       if (this.mostPlayedGames.length > 0) return;
       this.isSliderLoading = true;
       try {
         const params = new URLSearchParams({
           key: RAWG_API_KEY,
           ordering: '-added', 
           page_size: '10',
         });
         const url = `${RAWG_BASE_URL}/games?${params.toString()}`;
         const response = await axios.get<GameListResponse>(url);
         this.mostPlayedGames = response.data.results;
       } catch (err) {
         console.error('Gagal fetch most played games:', err);
       } finally {
         this.isSliderLoading = false;
       }
     },

    /**
     * @name fetchGameDetail
     * @description Mengambil game ID
     */
    async fetchGameDetail(id: number) {
      this.isLoading = true;
      this.error = null;
      this.gameDetail = null;

      try {
        const url = `${RAWG_BASE_URL}/games/${id}?key=${RAWG_API_KEY}`;
        const response = await axios.get<GameDetail>(url);
        
        this.gameDetail = response.data;

      } catch (err) {
        this.error = 'Gagal mengambil detail game.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});