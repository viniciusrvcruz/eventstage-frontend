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
