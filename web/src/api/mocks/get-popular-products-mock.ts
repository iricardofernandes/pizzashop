import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      product: 'Pizza de Calabresa',
      amount: 321,
    },
    {
      product: 'Pizza de Frango',
      amount: 54,
    },
    {
      product: 'Pizza de Marguerita',
      amount: 231,
    },
    {
      product: 'Pizza de Bacon',
      amount: 233,
    },
    {
      product: 'Pizza de Muçarela',
      amount: 56,
    },
  ])
})
