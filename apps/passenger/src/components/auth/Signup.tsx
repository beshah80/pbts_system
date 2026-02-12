'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bus, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', formData);
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
          <h1 className="text-3xl font-bold text-moovit-text mb-2">Create Account</h1>
          <p className="text-moovit-secondary">Join us to unlock personalized features</p>
        </div>

        {/* Signup Form */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-moovit-text mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                  placeholder="+251 911 234 567"
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
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-moovit-text mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moovit-tertiary hover:text-moovit-secondary"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-[#2b78e4] border-moovit-light rounded focus:ring-[#2b78e4] mt-1"
              />
              <span className="ml-2 text-sm text-moovit-secondary">
                I agree to the{' '}
                <Link href="/terms" className="text-[#2b78e4] hover:text-blue-600 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#2b78e4] hover:text-blue-600 font-medium">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2b78e4] hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-all hover:scale-105 shadow-moovit-sm"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-moovit-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-[#2b78e4] hover:text-blue-600 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-green-50 rounded-xl border border-green-100 p-6">
          <h3 className="font-semibold text-moovit-text mb-3">What You'll Get</h3>
          <ul className="space-y-2 text-sm text-moovit-secondary">
            <li>• Save favorite routes for quick access</li>
            <li>• Get personalized service alerts</li>
            <li>• Share feedback to improve services</li>
            <li>• Access to exclusive features</li>
          </ul>
        </div>
      </div>
    </div>
  );
}