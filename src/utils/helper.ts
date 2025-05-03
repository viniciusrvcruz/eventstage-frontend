import { toast } from 'react-toastify'

export function alertToast(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning'
) {
  toast(message, {
    type,
    position: 'top-center',
    autoClose: 1500,
    theme: 'dark',
  })
}

export function decodeToken(token: string | undefined) {
  if (!token) return null

  try {
    const arrayToken = token.split('.')
    const user = JSON.parse(atob(arrayToken[1]))

    return user
  } catch (e) {
    return null
  }
}
