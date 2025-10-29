import { http, HttpResponse } from 'msw';

export const fakeGameListResponse = {
  count: 1,
  results: [
    {
      id: 1,
      name: 'Fake Game',
      released: '2020-01-01',
      rating: 4.5,
      background_image: 'https://via.placeholder.com/300x400',
      genres: [{ id: 1, name: 'Action' }],
      platforms: [{ platform: { id: 1, name: 'PC' } }],
    },
  ],
};

export const handlers = [
  http.get('https://api.rawg.io/api/games*', () => {
    return HttpResponse.json(fakeGameListResponse);
  }),
];
