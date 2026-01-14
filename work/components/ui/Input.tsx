import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (props.type === 'number' && (e.key === '-' || e.key === 'e')) {
            e.preventDefault()
        }
        props.onKeyDown?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'number') {
            const val = parseFloat(e.target.value)
            if (val < 0) {
                e.target.value = '0'
            }
        }
        props.onChange?.(e)
    }

    return (
        <input
            ref={ref}
            min={props.type === 'number' ? 0 : undefined}
            onKeyDown={handleKeyDown}
            className={twMerge(
                'w-full bg-transparent border-b border-white/50 focus:border-white py-2 text-2xl font-mono text-white placeholder:text-gray-600 focus:outline-none transition-colors',
                className
            )}
            {...props}
            onChange={handleChange}
        />
    )
})
Input.displayName = 'Input'
