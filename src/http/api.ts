import { env } from '@/env'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Methods = 'post' | 'get' | 'put' | 'delete'

const baseURL = env.NEXT_PUBLIC_API_URL

interface CallOptions {
  isPrivate?: boolean
}

const call = async <T = unknown>(
  method: Methods,
  url: string,
  data: object = {},
  options: CallOptions = { isPrivate: false }
): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (options.isPrivate) {
    const token = (await cookies()).get('token')?.value
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const api: AxiosInstance = axios.create({
    baseURL,
    headers,
  })

  try {
    const response = await api[method](url, data)

    return response.data
  } catch (error) {
    if (
      options.isPrivate &&
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      redirect('/api/logout')
    }

    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        data: error?.response?.data,
      }
    }

    throw {
      status: 500,
    }
  }
}

export const publicApi = {
  get: <T = unknown>(url: string, params: object = {}): Promise<T> => {
    return call<T>('get', url, params)
  },
  post: <T = unknown>(url: string, data: object): Promise<T> => {
    return call<T>('post', url, data)
  },
  put: <T = unknown>(url: string, data: object): Promise<T> => {
    return call<T>('put', url, data)
  },
  del: <T = unknown>(url: string, data: object = {}): Promise<T> => {
    return call<T>('delete', url, data)
  },
}

export const privateApi = {
  get: <T = unknown>(url: string, params: object = {}): Promise<T> => {
    return call<T>('get', url, params, { isPrivate: true })
  },
  post: <T = unknown>(url: string, data: object): Promise<T> => {
    return call<T>('post', url, data, { isPrivate: true })
  },
  put: <T = unknown>(url: string, data: object): Promise<T> => {
    return call<T>('put', url, data, { isPrivate: true })
  },
  del: <T = unknown>(url: string, data: object = {}): Promise<T> => {
    return call<T>('delete', url, data, { isPrivate: true })
  },
}
