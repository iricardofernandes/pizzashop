import { http, HttpResponse } from 'msw'
import type { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'manager',
      phone: '+1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
)
