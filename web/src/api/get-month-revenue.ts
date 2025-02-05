import { api } from '@/lib/axios'

export interface GetMonthRevenueAmountResponse {
  revenue: number
  diffFromLastMonth: number
}

export async function getMonthRevenueAmount() {
  const response = await api.get<GetMonthRevenueAmountResponse>(
    '/metrics/month-revenue'
  )

  return response.data
}
