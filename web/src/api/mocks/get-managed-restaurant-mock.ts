import { http, HttpResponse } from 'msw'
import type { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'restaurant-1',
    name: 'Pizza Shop',
    description: 'Pizza Shop is a great place to eat pizza.',
    managerId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})
