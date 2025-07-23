"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge, Calendar, Heart, LogOut, Mail, User } from "lucide-react";
import clsx from "clsx"; // Optional utility for conditional classes
import { useAuth } from "@/context/auth-context";

export const SidebarContent = () => {
  const router = useRouter();
  const pathname = usePathname();
 // {
    //   href: "/inbox",
    //   icon: <Mail size={20} />,
    //   label: "Inbox",
    //   badge: 3,
    // },
  const links = [
    {
      href: "/Dashboard",
      icon: <Calendar size={20} />,
      label: "Reservations",
    },
   
    {
      href: "/Favourite",
      icon: <Heart size={20} />,
      label: "Favorites",
    },
    {
      href: "/Profile",
      icon: <User size={20} />,
      label: "Profile",
    },
  ];
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh(); // Refresh the page to update UI state
      router.push("/");
      localStorage.removeItem("session");
      localStorage.removeItem("GuestyId");
      localStorage.removeItem("access_token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleClick = () => {
    router.push("/");
  };
  return (
    <section>
      <div
        className="p-6 flex w-full justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src={"/logoside.svg"} />
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {links.map(({ href, icon, label, badge }) => {
            const isActive = pathname === href;

            return (
              <div
                key={href}
                onClick={() => router.push(`${href}`)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors",
                  {
                    "bg-[#ffffff]/10 text-white": isActive,
                    "text-[#8c8c8c] hover:text-white": !isActive,
                  }
                )}
              >
                {icon}
                <span>{label}</span>
                {badge && (
                  <Badge className="ml-auto bg-[#59d750] text-white text-xs px-2 py-1 rounded-full">
                    {badge}
                  </Badge>
                )}
              </div>
            );
          })}

          <div
            className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-[#8c8c8c] hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </div>
      </nav>
    </section>
  );
};
