import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, id, name, ...props }, ref) => {
    const inputId = id || name
    
    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-2">
          <input
            type={type}
            id={inputId}
            name={name}
            className={cn(
              "block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'
