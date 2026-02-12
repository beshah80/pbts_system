'use client';

import { useState } from 'react';
import { Bus, Mail, Lock, Eye, EyeOff, X, User, Phone } from 'lucide-react';
import { LoginFormData, SignupFormData } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    // Handle login logic
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', signupData);
    // Handle signup logic
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-moovit-light">
          <div className="flex items-center space-x-3">
            <div className="bg-[#2b78e4] p-2 rounded-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-moovit-text">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-moovit-secondary">
                {isSignup ? 'Join AddisTransport today' : 'Sign in to continue'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-moovit-tertiary hover:text-moovit-secondary p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {!isSignup ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type="text"
                    required
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="Enter username or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moovit-tertiary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2b78e4] hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all"
              >
                Sign In
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                    <input
                      type="text"
                      required
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
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
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type="tel"
                    required
                    value={signupData.phoneNumber}
                    onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="+251 911 234 567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moovit-tertiary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-moovit-text mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-moovit-tertiary" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4]"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moovit-tertiary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2b78e4] hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-moovit-secondary">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#2b78e4] hover:text-blue-600 font-medium"
              >
                {isSignup ? 'Sign in here' : 'Sign up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}