import { defineStore } from 'pinia';
import axios from 'axios';
import { RAWG_BASE_URL, RAWG_API_KEY } from '../constants/api'; 
import type { Game, GameDetail, GameListResponse } from '../types/Game'; 


interface GameState {
  games: Game[];
  gameDetail: GameDetail | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  topRatedGames: Game[];
  mostPlayedGames: Game[];
  isSliderLoading: boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    games: [],
    gameDetail: null,
    currentPage: 1,
    pageSize: 20, 
    totalCount: 0,
    searchQuery: '',
    isLoading: false,
    error: null,
    topRatedGames: [],
    mostPlayedGames: [],
    isSliderLoading: false,
  }),

  getters: {
    totalPages(state): number {
      if (state.totalCount === 0 || state.pageSize === 0) return 1;
      return Math.ceil(state.totalCount / state.pageSize);
    },
  },

  // Actions 
  actions: {
    /**
     * @name fetchGames
     * @description Mengambil daftar game dari API
     */
    async fetchGames(page: number) {
      this.isLoading = true;
      this.error = null;
      this.currentPage = page;

      try {
        const params = new URLSearchParams({
          key: RAWG_API_KEY,
          page: String(page),
          page_size: String(this.pageSize),
        });
        if (this.searchQuery.trim() !== '') {
          params.append('search', this.searchQuery);
        }

        const url = `${RAWG_BASE_URL}/games?${params.toString()}`;

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
     * @name fetchTopRatedGames
     * @description Mengambil 10 game dengan rating tertinggi untuk slider
     */
        async fetchTopRatedGames() {
          this.isSliderLoading = true;
          try {
            const params = new URLSearchParams({
              key: RAWG_API_KEY,
              page: '1',
              page_size: '10',
              ordering: '-rating',
            });
            const url = `${RAWG_BASE_URL}/games?${params.toString()}`;
            const response = await axios.get<GameListResponse>(url);
            this.topRatedGames = response.data.results;
          } catch (err) {
            console.error('Gagal fetch Top Rated:', err);
          } finally {
            this.isSliderLoading = false;
          }
        },

        /**
     * @name fetchMostPlayedGames
     * @description Mengambil 10 game paling populer (sering dimainkan/ditambahkan)
     */
        async fetchMostPlayedGames() {
          this.isSliderLoading = true;
          try {
            const params = new URLSearchParams({
              key: RAWG_API_KEY,
              page: '1',
              page_size: '10',
              ordering: '-added', 
            });
            const url = `${RAWG_BASE_URL}/games?${params.toString()}`;
            const response = await axios.get<GameListResponse>(url);
            this.mostPlayedGames = response.data.results;
          } catch (err) {
            console.error('Gagal fetch Most Played:', err);
          } finally {
            this.isSliderLoading = false;
          }
        },

    /**
     * @name setSearchQuery
     * @description Mengatur query pencarian 
     */
    async setSearchQuery(query: string) {
      this.searchQuery = query;
      await this.fetchGames(1);
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