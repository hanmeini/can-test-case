// src/types/Game.ts

// Interface untuk data platform 
interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

// Interface untuk data genre 
interface Genre {
  id: number;
  name: string;
  slug: string;
}

/**
 * @name Game
 * @description Tipe data dasar untuk game .
 */
export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  platforms: Platform[]; 
  genres: Genre[];   
}

/**
 * @name GameDetail
 * @description Tipe data lengkap untuk detail game
 */
export interface GameDetail extends Game {
  description_raw: string; 
  website: string;
}

/**
 * @name GameListResponse
 * @description Tipe data untuk respons API saat fetching daftar game
 */
export interface GameListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}