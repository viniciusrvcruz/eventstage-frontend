import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface TextareaRootProps extends ComponentProps<'div'> {
  error?: boolean
}

export function TextareaRoot({
  error = false,
  className,
  ...props
}: TextareaRootProps) {
  return (
    <div
      data-error={error}
      className={cn(
        'group bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 flex items-center gap-2 focus-within:border-gray-100 data-[error=true]:border-danger',
        className
      )}
      {...props}
    />
  )
}

interface TextareaIconProps extends ComponentProps<'span'> {}

export function TextareaIcon(props: TextareaIconProps) {
  return (
    <span
      className="text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(textarea:placeholder-shown))]:text-gray-100 group-data-[error=true]:text-danger"
      {...props}
    />
  )
}

interface TextareaFieldProps extends ComponentProps<'textarea'> {}

export function TextareaField(props: TextareaFieldProps) {
  return (
    <textarea
      className="flex-1 outline-0 placeholder-gray-400 resize-none"
      {...props}
    />
  )
}
