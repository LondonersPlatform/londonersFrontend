"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl p-8 w-full max-w-xl mx-4"
      >
        <button
          onClick={onClose}
          className="absolute bg-gray-100 right-0 top-[-10px] p-2 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="LONDONERS"
            width={200}
            height={50}
            className="h-10 object-contain"
          />
        </div>
        <div className=" mx-auto max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

          <p className="text-center mb-6">
            Do you already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onLoginClick();
              }}
              className="text-black underline hover:underline"
            >
              Log In
            </a>
          </p>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full lg:text-[15px] text-[13px] flex items-center py-3 justify-center gap-2 bg-[#1877F2] text-white hover:bg-blue-700"
            >
              <Image
                src={"./face0.png"}
                alt="facebook"
                width={20}
                height={20}
              />
              Signup with Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full lg:text-[15px] text-[13px] flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300"
            >
              <Image
                src={"./goagle0.png"}
                alt="goagle"
                width={20}
                height={20}
              />
              Signup with Google
            </Button>
          </div>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Register with your email
              </span>
            </div>
          </div>

          <form className="space-y-2">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="h-4 w-4 rounded bg-white border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree with your{" "}
                <a href="#" className="text-black hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <Button
              variant="primary"
              className="w-full py-3 bg-black hover:bg-white/90"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
