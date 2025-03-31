import Api from '@/http/api'
import type { ILoginPayload, IRegisterPayload } from '@/types/auth'
import type { AxiosResponse } from 'axios'

export class AuthService {
  private api = new Api(false)

  async login(payload: ILoginPayload) {
    return this.api.post('/login', payload)
  }

  async register(
    payload: IRegisterPayload
  ): Promise<AxiosResponse<{ token: string }>> {
    return this.api.post('/register', payload)
  }
}
