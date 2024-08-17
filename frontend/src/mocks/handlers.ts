import { http, HttpResponse } from 'msw';
import { itemData } from './data';

export const handlers = [
  // GET request to fetch data
  http.get('/api/data', () => {
    return HttpResponse.json(itemData);
  }),

  http.put('/api/data', async ({ request }) => {
    const updatedData = await request.json();
    return HttpResponse.json(updatedData);
  }),
];
