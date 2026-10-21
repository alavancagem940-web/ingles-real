import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl text-base font-extrabold tracking-wide transition-transform select-none touch-manipulation disabled:pointer-events-none disabled:opacity-50 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/80',
  {
    variants: {
      variant: {
        default: 'bg-green text-[#082016] shadow-[0_4px_0_0_#2bb574] hover:bg-green-dark',
        gold: 'bg-gold text-[#102012] shadow-[0_4px_0_0_#C99B00] hover:brightness-95',
        blue: 'bg-blue text-white shadow-[0_4px_0_0_#2f86e0] hover:bg-blue-dark',
        danger: 'bg-red text-white shadow-[0_4px_0_0_#E25555] hover:bg-red-dark',
        outline: 'border-2 border-line bg-transparent text-white shadow-none hover:bg-white/5',
        ghost: 'bg-transparent text-white shadow-none hover:bg-white/5',
        muted: 'bg-card text-white border-2 border-line shadow-none hover:border-blue',
      },
      size: {
        default: 'h-12 px-5',
        sm: 'h-auto min-h-10 px-3 py-2 text-sm',
        lg: 'h-14 px-6 text-lg w-full',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'
