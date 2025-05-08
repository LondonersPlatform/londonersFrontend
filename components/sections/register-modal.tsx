'use client'

import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick: () => void
}

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setError: setFormError,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  })

  const modalRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()
  const password = watch('password')

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
      reset()
    }
  }, [isOpen, onClose, reset])

  const onSubmit = async (data: FormData) => {
    try {
      // Sign up with Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      const session = await supabase.auth.getSession()
      
      if (session.data.session) {
        // Save to localStorage
        localStorage.setItem('access_token', session.data.session.access_token)
        localStorage.setItem('email', data.email)
        
        // Navigate to dashboard
        router.push('/Dashboard')
        onClose()
      } else {
        throw new Error('No session data received')
      }
    } catch (error) {
      setFormError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Registration failed',
      })
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      setFormError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Google signup failed',
      })
    }
  }

  const handleFacebookSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      setFormError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Facebook signup failed',
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center h-full justify-center bg-black/50">
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
        <div className="mx-auto lg:max-w-lg lg:px-8 px-2 h-auto  overflow-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

          <p className="text-center mb-6">
            Do you already have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onLoginClick()
              }}
              className="text-black underline hover:underline"
            >
              Log In
            </a>
          </p>

          {errors.root && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {errors.root.message}
            </div>
          )}
{/* 
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full lg:text-[15px] text-[13px] flex items-center py-3 justify-center gap-2 bg-[#1877F2] text-white hover:bg-blue-700"
              onClick={handleFacebookSignUp}
              disabled={isSubmitting}
            >
              <Image src="./face0.png" alt="facebook" width={20} height={20} />
              Signup with Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full lg:text-[15px] text-[13px] flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300"
              onClick={handleGoogleSignUp}
              disabled={isSubmitting}
            >
              <Image src="./goagle0.png" alt="google" width={20} height={20} />
              Signup with Google
            </Button>
          </div> */}

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

          <form className="space-y-2 " onSubmit={handleSubmit(onSubmit)} >
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.name ? 'border-red-500' : ''
                }`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
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
            <div>
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.password ? 'border-red-500' : ''
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className={`h-4 w-4 rounded bg-white border-gray-300 text-black focus:ring-black ${
                  errors.agreeTerms ? 'border-red-500' : ''
                }`}
                {...register('agreeTerms', {
                  required: 'You must agree to the terms and conditions',
                })}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree with your{' '}
                <a href="#" className="text-black hover:underline">
                  Terms & Conditions
                </a>
              </label>
     
            </div>
            <div>   {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600 ml-2">
                  {errors.agreeTerms.message}
                </p>
              )}</div>

            <Button
              variant="primary"
              className="w-full py-3 bg-black hover:bg-black/90"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}