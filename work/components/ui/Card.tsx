import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge('bg-black border border-white p-6', className)}
            {...props}
        />
    )
})
Card.displayName = 'Card'
