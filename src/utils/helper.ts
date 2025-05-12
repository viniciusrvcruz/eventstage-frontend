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

export function getDateParams(
  dateISO: string,
  t: (key: string, params?: Record<string, string | number>) => string
) {
  const date = new Date(dateISO)

  const day = date.getUTCDate()
  const month = t(`months.${date.getUTCMonth()}`)
  const year = date.getUTCFullYear()
  const hour = String(date.getUTCHours()).padStart(2, '0')
  const minute = String(date.getUTCMinutes()).padStart(2, '0')

  return t('private.events.event_date', {
    day,
    month,
    year,
    hour,
    minute,
  })
}

export function removeTokenFromCookies() {
  const date = new Date(0).toUTCString()
  document.cookie = `token=; expires=${date}; path=/`
}
