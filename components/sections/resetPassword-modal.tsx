'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client'

interface ResetModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  email: string
}

export default function ResetModal({ isOpen, onClose }: ResetModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const [error, setError] = useState<any | null>(null)
  const [success, setSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (isOpen) {
      reset()
      setError(null)
      setSuccess(false)
    }
  }, [isOpen, reset])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const onSubmit = async (data: FormData) => {
    try {
      setError(null)
      setSuccess(false)
      
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        throw error
      }

      setSuccess(true)
    } catch (err:any) {
      setError(err.message || 'Failed to send reset link. Please try again.')
    }
  }

  if (!isOpen) return null

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
          <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-green-600 mb-4">
                Password reset link has been sent to your email!
              </p>
              <p className="text-sm text-gray-600">
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <Button
                variant="primary"
                className="w-full py-3 bg-black hover:bg-black/90 mt-4"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center mb-6">
                Enter your email address to receive a password reset link.
              </p>

              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Enter your email
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  variant="primary"
                  className="w-full py-3 bg-black hover:bg-black/90"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}