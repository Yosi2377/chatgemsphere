import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const RenameInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-8 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
RenameInput.displayName = "RenameInput"

export { Input, RenameInput }
