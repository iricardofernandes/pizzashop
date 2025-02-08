import { api } from '@/lib/axios'

export interface GetProfileResponse {
  email: string
  id: string
  name: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date
  updatedAt: Date
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
