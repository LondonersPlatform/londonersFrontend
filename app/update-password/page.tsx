"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useLoginModal } from "@/context/login-modal-context";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const { setLoginOpen } = useLoginModal();
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("");
      setError(error.message);
    } else {
      setError("");
      setMessage("Password updated! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
      setLoginOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">

      <Card className="w-full py-16 pb-6 mx-16 px-6 max-w-md shadow-lg">
        
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={50}
            className="h-10 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Set New Password
        </h2>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
               {error && (
              <div
                className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm"
                role="alert"
              >
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.25a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zm0-6a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div
                className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm"
                role="status"
              >
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{message}</span>
              </div>
            )}
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full" type="submit">
              Update Password
            </Button>

         
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
