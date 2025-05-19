import { env } from '@/env'
import { cookies } from 'next/headers'
import { APIError } from './api-error'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const baseURL = env.NEXT_PUBLIC_API_URL

export async function apiRequest(
  method: Method,
  url: string,
  data?: object | null
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const token = (await cookies()).get('token')?.value

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(`${baseURL}/${url}`, options)

  let responseBody = null

  try {
    responseBody = await response.json()
  } catch {}

  if (!response.ok) {
    console.error('API error:', responseBody)
    throw new APIError(responseBody?.status || 500, responseBody?.error)
  }

  return responseBody
}
