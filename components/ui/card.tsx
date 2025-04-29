import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("group relative rounded-lg border border-gray-200 overflow-hidden", className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative h-48 w-full overflow-hidden", className)} {...props} />
})
CardImage.displayName = "CardImage"

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-4", className)} {...props} />
})
CardContent.displayName = "CardContent"

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("font-medium", className)} {...props} />
})
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
  },
)
CardDescription.displayName = "CardDescription"

export { Card, CardImage, CardContent, CardTitle, CardDescription }

