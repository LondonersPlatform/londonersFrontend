"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getGuestyId } from "@/app/all-listings/Listing";

interface ProfileDropdownProps {
  isLoading: boolean;
}

export function ProfileDropdown({}: ProfileDropdownProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  useEffect(() => {
    const fetchGuestyId = async () => {
      if (session?.user?.email) {
        try {
          const GuestyId = await getGuestyId(session.user.email);
          localStorage.setItem("GuestyId", GuestyId.guesty_user_id);
          console.log("Guesty ID:", GuestyId);
        } catch (error) {
          console.error("Failed to fetch Guesty ID:", error);
        }
      }
    };

    fetchGuestyId();
  }, [session]);
  console.log(session, "session in profile dropdown");
  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh(); // Refresh the page to update UI state
      localStorage.removeItem("session");
      localStorage.removeItem("GuestyId");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
const email =localStorage.getItem("email") || session?.user?.email || "dee";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 border-2 w-10 cursor-pointer">
          <AvatarImage
            src={session?.avatarUrl}
            alt={email}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {session?.user?.email || email
              ? email.slice(0, 2).toUpperCase()
              : ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.user_metadata.email?.length > 10
                ? `${session?.user?.user_metadata.email.slice(0, 20)}...`
                : session?.user?.user_metadata.email}
            </p>

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
  );
}
