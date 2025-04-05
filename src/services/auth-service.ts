'use server'

import { privateApi, publicApi } from '@/http/api'
import type { IResponse } from '@/types/api'
import type { ILoginPayload, IRegisterPayload } from '@/types/auth'
import type { UserSchema } from '@/types/user'

interface ILoginResponse extends IResponse {
  token: string
}

interface IGetAuthUserResponse extends IResponse {
  user: UserSchema
}

export async function login(payload: ILoginPayload) {
  return publicApi.post<ILoginResponse>('/login', payload)
}

export async function register(payload: IRegisterPayload) {
  return publicApi.post<IResponse>('/register', payload)
}

export async function getAuthUser() {
  return privateApi.get<IGetAuthUserResponse>('/get-auth-user')
}
