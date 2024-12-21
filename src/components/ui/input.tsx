import * as React from 'react'

import { ny } from '@/lib/utils'

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={ny(
               'border-input placeholder:text-muted-foreground focus-visible:border-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-2 disabled:cursor-not-allowed disabled:opacity-50',
               className,
            )}
            ref={ref}
            {...props}
         />
      )
   },
)
Input.displayName = 'Input'

export { Input }
