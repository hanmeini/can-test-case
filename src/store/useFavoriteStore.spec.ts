import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavoriteStore } from "./useFavoriteStore";

describe("useFavoriteStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Mock localStorage methods
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => "[]"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  const sampleGame = {
    id: 99,
    slug: "mock-game",
    name: "Mock Game",
    released: "2022-01-01",
    rating: 5,
    background_image: "",
    genres: [],
    platforms: [],
  };

  it("toggleFavorite adds game to favorites and calls localStorage.setItem", () => {
    const store = useFavoriteStore();
    store.toggleFavorite(sampleGame);
    expect(store.favorites.length).toBe(1);
    expect(store.favorites[0]).toEqual(sampleGame);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("toggleFavorite removes game from favorites and calls localStorage.setItem", () => {
    const store = useFavoriteStore();
    store.toggleFavorite(sampleGame); // add
    store.toggleFavorite(sampleGame); // remove
    expect(store.favorites.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it("isGameFavorite returns correct value", () => {
    const store = useFavoriteStore();
    expect(store.isGameFavorite(99)).toBe(false);
    store.toggleFavorite(sampleGame);
    expect(store.isGameFavorite(99)).toBe(true);
  });
});
