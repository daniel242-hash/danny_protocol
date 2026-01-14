import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary'
    isLoading?: boolean
    fullWidth?: boolean
    children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    isLoading,
    fullWidth,
    children,
    disabled,
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-bold uppercase transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-white text-black hover:bg-gray-200 border border-white',
        secondary: 'bg-black text-white border border-white hover:bg-gray-900',
    }

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.98 }}
            className={twMerge(clsx(baseStyles, variants[variant], fullWidth && 'w-full', className))}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {children}
        </motion.button>
    )
})
Button.displayName = 'Button'
