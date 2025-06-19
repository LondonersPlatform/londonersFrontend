"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge, Calendar, Heart, Mail, User } from "lucide-react";
import clsx from "clsx"; // Optional utility for conditional classes

export const SidebarContent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    {
      href: "/Dashboard",
      icon: <Calendar size={20} />,
      label: "Reservations",
    },
    {
      href: "/inbox",
      icon: <Mail size={20} />,
      label: "Inbox",
      badge: 3,
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

  return (
    <>
      <div className="p-6">
        <div className="text-xl font-bold tracking-wider">LONDONERS</div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {links.map(({ href, icon, label, badge }) => {
            const isActive = pathname === href;

            return (
              <div
                key={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors",
                  {
                    "bg-[#ffffff]/10 text-white": isActive,
                    "text-[#8c8c8c] hover:text-white": !isActive,
                  }
                )}
                onClick={() => router.push(href)}
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
        </div>
      </nav>
    </>
  );
};
