'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bus, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-moovit-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-[#2b78e4] p-3 rounded-xl">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-moovit-text">AddisTransport</span>
          </div>
          <h1 className="text-3xl font-bold text-moovit-text mb-2">Welcome Back</h1>
          <p className="text-moovit-secondary">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-moovit-text mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-moovit-text mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moovit-tertiary hover:text-moovit-secondary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#2b78e4] border-moovit-light rounded focus:ring-[#2b78e4]"
                />
                <span className="ml-2 text-sm text-moovit-secondary">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#2b78e4] hover:text-blue-600 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2b78e4] hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-all hover:scale-105 shadow-moovit-sm"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-moovit-secondary">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#2b78e4] hover:text-blue-600 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-blue-50 rounded-xl border border-blue-100 p-6">
          <h3 className="font-semibold text-moovit-text mb-3">Account Benefits</h3>
          <ul className="space-y-2 text-sm text-moovit-secondary">
            <li>• Save your favorite routes</li>
            <li>• Receive personalized alerts</li>
            <li>• Provide feedback and suggestions</li>
            <li>• Track your travel history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}