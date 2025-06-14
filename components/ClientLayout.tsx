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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, session } = useAuth();

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

         <Header />
          {children}
          <Footer />
         
        </>
      )}
    </>
  );
}
