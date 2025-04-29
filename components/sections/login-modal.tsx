"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import RegisterModal from "./register-modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      setShowRegister(false);
    }
  }, [isOpen]);
  
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

    if (isOpen && !showRegister) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, showRegister]);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
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

        <div className="flex justify-center  mb-6">
          <Image
            src="/logo.png"
            alt="LONDONERS"
            width={200}
            height={50}
            className="h-10 object-contain"
          />
        </div>

        <div className=" mx-auto max-w-md">
          <h2 className="text-2xl  font-bold text-center mb-4">Login</h2>

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
              className="w-full lg:text-[15px] text-[13px] flex items-center justify-center gap-2 bg-[#1877F2] text-white "
            >
            <Image src={'./face0.png'} alt="facebook" width={20} height={20}/>
              Signup with Facebook
            </Button>

            <Button
           
              className="w-full flex lg:text-[15px] text-[13px] hover:text-white items-center  justify-center gap-2 bg-[#EAEAEA] text-gray-700   border-gray-300"
            >
              <Image src={'./goagle0.png'} alt="facebook" width={20} height={20}/>
              Signup with Google
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

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full  px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
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
              <a href="#" className="text-sm underline text-gray-700 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              variant="primary"
              className="w-full py-3 bg-black hover:bg-black/90"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
