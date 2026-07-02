'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Simulate login
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('[v0] Login successful with:', { username, email, rememberMe })
      
      // Redirect to dashboard
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main container */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Branding and Image */}
          <div className="flex flex-col items-center lg:items-start justify-center space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-full glass-sm flex items-center justify-center p-2 group-hover:neon-glow transition-all duration-300">
                <Image
                  src="/cart-logo.png"
                  alt="ShopCart Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                ShopCart
              </span>
            </div>

            {/* Tagline */}
            <div className="space-y-1 max-w-sm">
              <h1 className="text-3xl font-bold text-slate-100 leading-snug text-balance">
                Want to fulfil{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  cravings
                </span>
                {' '}of shopping
                <br />
                <span className="text-slate-100">without shopping</span>
              </h1>
            </div>

            {/* Beach illustration */}
            <div className="w-full max-w-sm glass p-4 overflow-hidden group hover:bg-white/15 transition-all duration-300">
              <Image
                src="/beach-shopping.png"
                alt="Beach shopping illustration"
                width={400}
                height={400}
                className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md glass p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-100">Login</h2>
                <p className="text-slate-400">Enter your details to get started</p>
              </div>

              {/* Error message */}
              {error && (
                <div className="glass-sm bg-red-500/20 border-red-500/50 p-3 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}



              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username input */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-slate-200">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full glass-sm px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200"
                  />
                </div>

                {/* Email input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full glass-sm px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200"
                  />
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-slate-500 bg-white/5 cursor-pointer accent-emerald-400 hover:border-emerald-400 transition-colors"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                    Remember me
                  </label>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>

              {/* Links */}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setUsername('demo_user')
                    setEmail('demo@shopcart.com')
                  }}
                  className="text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  Try demo login
                </a>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-600"></div>
                  <span className="text-xs">or</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-600"></div>
                </div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-center text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Don&apos;t have an account?{' '}
                  <span className="text-violet-400 hover:text-violet-300 font-medium">Sign up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
