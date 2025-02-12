import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-400 dark:text-gray-900 dark:hover:bg-primary-500",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-500",
        outline:
          "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
        ghost: "text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100",
        link: "text-primary-600 underline hover:no-underline dark:text-primary-400",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-11 px-8 py-2 text-lg",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "shadow-sm")}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
