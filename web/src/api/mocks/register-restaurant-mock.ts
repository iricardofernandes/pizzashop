import { http, HttpResponse } from 'msw'
import type { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/metrics/day-orders-amount',
  async ({ request }) => {
    const { restaurantName } = await request.json()

    if (restaurantName === 'Pizza Shop') {
      return new HttpResponse(null, {
        status: 200,
      })
    }

    return new HttpResponse(null, { status: 400 })
  }
)
