'use client'

import ProtectedRoute from "@/components/layout/ProtectedRoute"


function Dashboard() {
  return (
    <ProtectedRoute>
      <div className='rounded-2xlp-24 flex justify-center items-center font-bold text-2xl w-full h-[100vh]'>
        Welcome To Landoners Dashboard
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard
