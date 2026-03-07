import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600",
      secondary: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
      outline: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      ghost: "text-gray-900 hover:bg-gray-100",
      danger: "bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline-red-600",
    }
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 py-3 text-base",
    }
    
    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
