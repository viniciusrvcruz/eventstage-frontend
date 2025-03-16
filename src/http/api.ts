import { env } from '@/env'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const baseURL = env.NEXT_PUBLIC_API_URL
export default class Api {
  private api: AxiosInstance

  constructor(interceptErrors = true) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })

    if (interceptErrors) {
      this.api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            Cookies.remove('token')
            window.location.reload()
          }
          return Promise.reject(error)
        }
      )
    }
  }

  async get(url: string) {
    return this.api.get(url)
  }

  async post(url: string, data: object) {
    return this.api.post(url, data)
  }

  async put(url: string, data: object) {
    return this.api.put(url, data)
  }

  async delete(url: string) {
    return this.api.delete(url)
  }
}
