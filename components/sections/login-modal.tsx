"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import RegisterModal from "./register-modal";
import { Button } from "../ui/button";
import ResetModal from "./resetPassword-modal";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setShowRegister(false);
      setShowReset(false);
      setError(null);
      reset(); // Reset form when modal opens
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && !showRegister && !showReset) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, showRegister, showReset]);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  };
  
  const handleResetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowReset(true);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowReset(false);
  };

  const handleEmailLogin = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Get session data
      const session = await supabase.auth.getSession();

      if (session.data.session) {
        // Save to localStorage
        localStorage.setItem("access_token", session.data.session.access_token);
        localStorage.setItem("email", formData.email);

        // Navigate to dashboard
        router.push("/Dashboard");
        onClose();
      } else {
        throw new Error("No session data received");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Google login failed");
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Facebook login failed"
      );
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showRegister) {
    return (
      <RegisterModal
        isOpen={true}
        onClose={onClose}
        onLoginClick={handleLoginClick}
      />
    );
  }
  if (showReset) {
    return <ResetModal isOpen={true} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl mx-4"
      >
        <button
          onClick={onClose}
          className="absolute right-[-4px] top-[-12px] bg-gray-100 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={50}
            className="h-10 object-contain"
          />
        </div>

        <div className="mx-auto max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <p className="text-center mb-6">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={handleRegisterClick}
              className="text-black underline hover:underline"
            >
              Register
            </a>
          </p>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full lg:text-[15px] text-[13px] flex items-center justify-center gap-2 bg-[#1877F2] text-white"
              onClick={handleFacebookLogin}
              disabled={loading}
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
              Login with Facebook
            </Button>

            <Button
              className="w-full flex lg:text-[15px] text-[13px] hover:text-white items-center justify-center gap-2 bg-[#EAEAEA] text-gray-700 border-gray-300"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Image src="/goagle.svg" alt="Google" width={20} height={20} />
              Login with Google
            </Button>
          </div>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Login with your email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(handleEmailLogin)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm underline text-gray-700 hover:underline"
                onClick={handleResetClick}
              >
                Forgot password?
              </a>
            </div>

            <Button
              variant="primary"
              className="w-full py-3 bg-black hover:bg-black/90"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}