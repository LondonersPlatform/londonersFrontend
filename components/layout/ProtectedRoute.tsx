"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === null && !isLoading) {
      router.push("/"); // Redirect to login or landing page
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (session === null || !session) return null;

  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
