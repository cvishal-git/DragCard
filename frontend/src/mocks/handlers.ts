import { http, HttpResponse } from 'msw';
import { itemData } from './data';

export const handlers = [
  // GET request to fetch data
  http.get('/api/data', () => {
    return HttpResponse.json(itemData);
  }),
];
