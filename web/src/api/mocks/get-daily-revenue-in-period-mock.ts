import { http, HttpResponse } from 'msw'
import type { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-revenue-in-period', () => {
  return HttpResponse.json([
    {
      date: '2025-02-08',
      revenue: 3213,
    },
    {
      date: '2025-02-07',
      revenue: 4321,
    },
    {
      date: '2025-02-06',
      revenue: 1234,
    },
    {
      date: '2025-02-05',
      revenue: 6321,
    },
    {
      date: '2025-02-04',
      revenue: 3412,
    },
    {
      date: '2025-02-03',
      revenue: 7312,
    },
    {
      date: '2025-02-02',
      revenue: 4512,
    },
  ])
})
