'use server'

import { apiRequest } from '@/lib/api-request'
import type { ILoginPayload, IRegisterPayload } from '@/types/auth'
import { cookies } from 'next/headers'

export async function login(payload: ILoginPayload) {
  return apiRequest('POST', 'login', payload)
}

export async function register(payload: IRegisterPayload) {
  return apiRequest('POST', 'register', payload)
}

export async function getAuthUser() {
  return apiRequest('GET', 'get-auth-user')
}

export async function setCookie(token: string) {
  const nextCookies = await cookies()

  nextCookies.set('token', token)

  return true
}
