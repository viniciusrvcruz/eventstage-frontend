import { Link } from '@/i18n/navigation'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface LinkButtonProps extends ComponentProps<'a'> {
  href: string
}

export function LinkButton({ href, className, ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex justify-between items-center px-5 h-12 bg-gray-500 text-blue font-semibold rounded-xl w-full cursor-pointer transition-colors duration-300 hover:bg-blue hover:text-gray-900',
        className
      )}
      {...props}
    />
  )
}
