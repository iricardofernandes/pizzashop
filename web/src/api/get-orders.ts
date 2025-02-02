import { api } from '@/lib/axios'

export interface GetOrdersResponse {
  orders: {
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    customerName: string
    orderId: string
    createdAt: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}
