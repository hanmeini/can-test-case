import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw'; 
import { fakeGameListResponse } from '../mocks/handlers';

describe('useGameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchGames fetches data and updates state from mock MSW', async () => {
    const store = useGameStore();
    await store.fetchGames(1);
    expect(store.isLoading).toBe(false);
    expect(store.games.length).toBeGreaterThan(0);
    expect(store.games[0].name).toBe(fakeGameListResponse.results[0].name);
    expect(store.error).toBe(null);
  });

  it('handles fetch error properly', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games', () => new HttpResponse(null, { status: 500 }))
    );
    const store = useGameStore();
    await store.fetchGames(1);
    expect(store.error).not.toBe(null);
  });

  it('totalPages is correct', () => {
    const store = useGameStore();
    store.totalCount = 44;
    expect(store.totalPages).toBe(3); // 44 / 20 = 2.2 -> 3
  });
});
