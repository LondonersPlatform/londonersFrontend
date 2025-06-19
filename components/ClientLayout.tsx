// app/components/ClientLayout.tsx
"use client";

import { useAuth } from "@/context/auth-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LogoLoader from "./logo-loader";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "@radix-ui/react-menubar";
import {
  Calendar,
  Heart,
  LayoutDashboard,
  MessageSquare,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, session } = useAuth();

  const pathname = usePathname();
  const hideHeader =
    pathname?.includes("/Dashboard") || pathname?.includes("/Favourite") || pathname?.includes("/Profile");
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <LogoLoader />
      </div>
    ); // or a spinner
  }

  return (
    <>
      {!session ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <>
          {!hideHeader && <Header />}

          {children}
        </>
      )}
    </>
  );
}
