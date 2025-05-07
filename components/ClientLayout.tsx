// app/components/ClientLayout.tsx
"use client";

import { useAuth } from "@/context/auth-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LogoLoader from "./logo-loader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center py-20"><LogoLoader/></div>; // or a spinner
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
