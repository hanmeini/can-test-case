import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameCard from './GameCard.vue';

describe('GameCard', () => {
  const mockGame = {
    id: 101,
    slug: 'mock-game',
    name: 'Testing Game Name',
    released: '2022-03-01',
    rating: 3.7,
    background_image: 'https://via.placeholder.com/300x400',
    genres: [{ id: 1, slug: 'puzzle', name: 'Puzzle' }],
    platforms: [{ platform: { id: 1, slug: 'switch', name: 'Switch' } }],
  };

  it('renders game name and rating', () => {
    const wrapper = mount(GameCard, {
      props: { game: mockGame }
    });
    expect(wrapper.text()).toContain('Testing Game Name');
    expect(wrapper.text()).toContain('3.7');
  });
});
