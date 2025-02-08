import { http, HttpResponse } from 'msw'
import type { GetMonthRevenueAmountResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueAmountResponse
>('/metrics/month-revenue', () => {
  return HttpResponse.json({
    revenue: 532100,
    diffFromLastMonth: 10,
  })
})
