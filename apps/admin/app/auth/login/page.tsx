'use client';

import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { useAuthStore } from '@/lib/auth';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Auto-focus email field on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Validate email format
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Get field-specific errors
  const getFieldError = (field: 'email' | 'password', value: string) => {
    if (!touched[field]) return null;
    
    if (field === 'email' && value && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }
    
    if (field === 'password' && value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    
    return null;
  };

  const handleBlur = (field: 'email' | 'password') => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Mark both fields as touched for validation
    setTouched({ email: true, password: true });
    
    // Frontend validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      emailRef.current?.focus();
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      const success = await login(email, password);
      
      if (success) {
        setToast({ message: 'Login successful! Redirecting to dashboard...', type: 'success' });
        // Success state with slight delay for UX
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setToast({ message: 'Invalid email or password. Please check your credentials and try again.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'System temporarily unavailable. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in password field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-white to-slate-50/80 px-4 py-6 sm:px-6 sm:py-8 lg:p-8 flex items-center justify-center backdrop-blur-sm">
          <div className="mx-auto w-full max-w-xl">
            <h1
              className="text-center text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold text-slate-900"
              style={{ fontFamily: 'cursive' }}
            >
              Welcome back
            </h1>
            <div className="mt-6">
              <img
                src="/assets/image/bus.png"
                alt="Bus"
                className="w-full h-auto max-w-[300px] sm:max-w-[400px] lg:max-w-[450px] mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-100/80 to-blue-100/60 px-4 py-8 sm:px-8 sm:py-10 lg:p-12 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-sm">
            <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl px-8 py-10 sm:px-10 ring-1 ring-slate-200/50">
              <div className="text-center">
                <img src="/assets/image/logo.jpg" alt="Logo" className="w-16 h-16 mx-auto object-contain" />
                <h2 className="mt-3 text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Admin Login Page</h2>
                <p className="mt-1 text-xs text-slate-600/80">Welcome Back! Please Sign In to your account.</p>
              </div>

              <form ref={formRef} onSubmit={handleLogin} className="mt-6 space-y-3" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-800 mb-1">
                    E-mail
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    onBlur={handleBlur('email')}
                    className={`w-full h-10 px-3 bg-white/80 backdrop-blur-sm border rounded-lg text-sm text-slate-900 outline-none shadow-sm transition-all duration-200
                      focus:ring-2 focus:ring-[#2b78e4]/20 focus:border-[#2b78e4] focus:bg-white focus:shadow-md
                      ${touched.email && getFieldError('email', email) ? 'border-rose-300' : 'border-slate-200 hover:border-slate-300'}`}
                    required
                    aria-invalid={touched.email && !!getFieldError('email', email)}
                    aria-describedby={touched.email && getFieldError('email', email) ? 'email-error' : undefined}
                    disabled={loading}
                  />
                  {touched.email && getFieldError('email', email) && (
                    <p id="email-error" className="mt-1 text-[11px] text-rose-600">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-800 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                      }}
                      onBlur={handleBlur('password')}
                      onKeyPress={handleKeyPress}
                      className={`w-full h-10 px-3 pr-10 bg-white/80 backdrop-blur-sm border rounded-lg text-sm text-slate-900 outline-none shadow-sm transition-all duration-200
                        focus:ring-2 focus:ring-[#2b78e4]/20 focus:border-[#2b78e4] focus:bg-white focus:shadow-md
                        ${touched.password && getFieldError('password', password) ? 'border-rose-300' : 'border-slate-200 hover:border-slate-300'}`}
                      required
                      minLength={8}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all duration-200 hover:scale-110"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {touched.password && getFieldError('password', password) ? (
                    <p id="password-error" className="mt-1 text-[11px] text-rose-600">
                      Password must be at least 8 characters
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-700 select-none">
                    <input type="checkbox" className="h-3 w-3 border border-slate-400 bg-white" />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-xs text-[#2b78e4] hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot your password?
                  </a>
                </div>

                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3 bg-rose-50 border border-rose-200 rounded-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-700">{error}</p>
                  </div>
                )}

                <div className="pt-3">
                  <Button
                    type="submit"
                    className="w-28 h-9 mx-auto block bg-gradient-to-r from-[#2b78e4] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Signing In
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}