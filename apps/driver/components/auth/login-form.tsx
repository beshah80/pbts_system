'use client';

import { Popup } from '@/components/ui/popup';
import { useAuthStore } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function LoginForm() {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ employeeNumber: false, password: false });
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const formRef = useRef<HTMLFormElement>(null);
  const employeeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    employeeRef.current?.focus();
  }, []);

  const getFieldError = (field: 'employeeNumber' | 'password', value: string) => {
    if (!touched[field]) return null;
    if (field === 'employeeNumber' && !value) return 'Employee ID is required';
    if (field === 'password' && value.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  const handleBlur = (field: 'employeeNumber' | 'password') => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTouched({ employeeNumber: true, password: true });
    
    if (!employeeNumber) {
      setPopup({ message: 'Please enter your Employee ID to continue.', type: 'error' });
      setLoading(false);
      employeeRef.current?.focus();
      return;
    }
    if (password.length < 8) {
      setPopup({ message: 'Password must be at least 8 characters long.', type: 'error' });
      setLoading(false);
      return;
    }
    
    try {
      await new Promise((r) => setTimeout(r, 800));
      const success = await login(employeeNumber, password);
      if (success) {
        setPopup({ message: 'Login successful! Redirecting to dashboard...', type: 'success' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setPopup({ message: 'Invalid Employee ID or password. Please check your credentials and try again.', type: 'error' });
      }
    } catch (err) {
      setPopup({ message: 'System temporarily unavailable. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-200/60">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-4 py-8 sm:px-8 sm:py-10 lg:p-12 flex items-center justify-center">
          <div className="mx-auto w-full max-w-2xl">
            <h1
              className="text-center text-4xl sm:text-[44px] leading-none font-semibold text-slate-900"
              style={{ fontFamily: 'cursive' }}
            >
              Welcome back
            </h1>
            <div className="mt-10">
              <img
                src="./images/bus.png"
                alt="Bus"
                className="w-full max-w-[520px] sm:max-w-[640px] mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#e9e9e9] px-4 py-8 sm:px-8 sm:py-10 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="bg-[#f0f0f0] border border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-lg px-8 py-10 sm:px-10">
              <div className="text-center">
                <img src="/assets/image/logo.jpg" alt="Logo" className="w-16 h-16 mx-auto object-contain" />
                <h2 className="mt-3 text-lg font-semibold text-slate-900">Driver Login Page</h2>
                <p className="mt-1 text-xs text-slate-600">Welcome Back! Please Sign In to your account.</p>
              </div>

              <form ref={formRef} onSubmit={handleLogin} className="mt-8 space-y-4" noValidate>
                <div>
                  <label htmlFor="employeeNumber" className="block text-xs font-semibold text-slate-800 mb-1">
                    Employee ID
                  </label>
                  <input
                    ref={employeeRef}
                    id="employeeNumber"
                    type="text"
                    value={employeeNumber}
                    onChange={(e) => {
                      setEmployeeNumber(e.target.value);
                    }}
                    onBlur={handleBlur('employeeNumber')}
                    className={`w-full h-10 px-3 bg-white border rounded-md text-sm text-slate-900 outline-none shadow-inner
                      focus:ring-2 focus:ring-[#2b78e4]/30 focus:border-[#2b78e4]
                      ${touched.employeeNumber && getFieldError('employeeNumber', employeeNumber) ? 'border-rose-300' : 'border-slate-300'}`}
                    required
                    aria-invalid={touched.employeeNumber && !!getFieldError('employeeNumber', employeeNumber)}
                    aria-describedby={touched.employeeNumber && getFieldError('employeeNumber', employeeNumber) ? 'employee-error' : undefined}
                    disabled={loading}
                  />
                  {touched.employeeNumber && getFieldError('employeeNumber', employeeNumber) && (
                    <p id="employee-error" className="mt-1 text-[11px] text-rose-600">
                      Employee ID is required
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-800 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={handleBlur('password')}
                    onKeyPress={handleKeyPress}
                    className={`w-full h-10 px-3 bg-white border rounded-md text-sm text-slate-900 outline-none shadow-inner
                      focus:ring-2 focus:ring-[#2b78e4]/30 focus:border-[#2b78e4]
                      ${touched.password && getFieldError('password', password) ? 'border-rose-300' : 'border-slate-300'}`}
                    required
                    minLength={8}
                    aria-invalid={touched.password && !!getFieldError('password', password)}
                    aria-describedby={touched.password && getFieldError('password', password) ? 'password-error' : undefined}
                    disabled={loading}
                  />
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
                  <a href="#" className="text-xs text-[#2b78e4] hover:underline" onClick={(e) => e.preventDefault()}>
                    Forgot your password?
                  </a>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-28 h-9 mx-auto block bg-[#2b78e4] hover:bg-blue-600 text-white text-xs font-semibold rounded-md shadow-sm"
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
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
