"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

interface ProfileDropdownProps {
  session:any
  isLoading:boolean
}

export function ProfileDropdown({ session ,isLoading }: ProfileDropdownProps) {
  const { signOut } = useAuth()
  const router = useRouter()
console.log("session",session)
  const handleLogout = async () => {
    try {
      await signOut()
      router.refresh() // Refresh the page to update UI state
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer border">
          <AvatarImage src={ "/placeholder.svg"} alt={session?.userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {session?.userName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.user_metadata.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}