
import React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface ResponsiveModalProps {
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export function ResponsiveModal({
  children,
  trigger,
  title,
  open,
  onOpenChange,
  className = "",
}: ResponsiveModalProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="py-6">{title}</DrawerTitle>
          </DrawerHeader>
          <div className={`px-4 pb-4 ${className}`}>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`max-w-2xl py-6 ${className}`}>
        <DialogHeader>
          <DialogTitle className="py-6">{title}</DialogTitle>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
