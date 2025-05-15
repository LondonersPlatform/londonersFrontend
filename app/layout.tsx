// app/layout.tsx (or app/layout.js in Next.js 13)
import "./globals.css";
import "./date-picker.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { AllListingProvider } from "@/context/AllListingContext";
import ClientLayout from "@/components/ClientLayout";
import { Suspense } from "react";
import Loading from "./loading";
import QueryProvider from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Londoners - Premium London Accommodations",
  description: "Find your perfect stay in London with Londoners premium accommodations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <AllListingProvider>
              <Suspense fallback={<Loading />}>
                <ClientLayout>
                  <QueryProvider>
                    {children}
                  </QueryProvider>
                </ClientLayout>
              </Suspense>
            </AllListingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
