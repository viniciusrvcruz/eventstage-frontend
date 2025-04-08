'use server'

import { privateApi, publicApi } from '@/http/api'
import type { ILoginPayload, IRegisterPayload } from '@/types/auth'
import type { UserSchema } from '@/types/user'
import { cookies } from 'next/headers'

interface ILoginResponse {
  token: string
}

interface IGetAuthUserResponse {
  user: UserSchema
}

export async function login(payload: ILoginPayload) {
  return publicApi.post<ILoginResponse>('/login', payload)
}

export async function register(payload: IRegisterPayload) {
  return publicApi.post('/register', payload)
}

export async function getAuthUser() {
  return privateApi.get<IGetAuthUserResponse>('/get-auth-user')
}

export async function setCookie(token: string) {
  const nextCookies = await cookies()

  nextCookies.set('token', token)

  return true
}
