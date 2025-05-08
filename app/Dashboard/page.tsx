"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Suspense } from "react";
import Loading from "../loading";

function Dashboard() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <ProtectedRoute>
        <div className="rounded-2xlp-24 flex justify-center items-center font-bold text-2xl w-full h-[100vh]">
          Welcome To Landoners Dashboard
        </div>
      </ProtectedRoute>
    </Suspense>
  );
}

export default Dashboard;
