
import "./globals.css";
import "./date-picker.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import ClientLayout from "@/components/ClientLayout";
import { Suspense } from "react";
import Loading from "./loading";
import QueryProvider from "@/components/QueryProvider";
import { LoginModalProvider } from "@/context/login-modal-context";
import { BookingProvider } from "@/context/DatePickerContext";

const inter = Inter({ subsets: ["latin"] });

// app/layout.tsx (or layout.js)
export const metadata = {
  title: "Londoners - Premium London Accommodations",
  description:
    "Find your perfect stay in London with Londoners premium accommodations",
  icons: {
    icon: "/lo.ico", // place favicon.ico in public/ folder
    shortcut: "/favicon.ico",
    apple: "/lo.png", // optional for iOS devices
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"font-Helv"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LoginModalProvider>
            <AuthProvider>
              {/* Wrap your layout in Suspense to show the loader */}
              <Suspense fallback={<Loading />}>
              < BookingProvider>
                <ClientLayout>
                  <QueryProvider> {children}</QueryProvider>
                </ClientLayout>
              </BookingProvider>
              
              </Suspense>
            </AuthProvider>
          </LoginModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
