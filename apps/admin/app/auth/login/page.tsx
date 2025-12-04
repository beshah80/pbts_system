'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const quickFillCredentials = () => {
    setEmail('atlasAdmin@admin.com');
    setPassword('my_password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-8">
            <div className="flex justify-center">
              <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm">
                <Bus className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black">PBTS Admin</h1>
              <p className="text-xl text-blue-100">Ethiopian Public Bus Transport System</p>
              <p className="text-blue-200/80 max-w-md">
                Comprehensive management dashboard for Addis Ababa public transportation network
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">🚌</div>
                <p className="text-sm">Fleet Management</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm">Analytics</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">👥</div>
                <p className="text-sm">Driver Management</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">⚙️</div>
                <p className="text-sm">System Control</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-6 lg:hidden">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                    <Bus className="w-8 h-8 text-white" />
                  </div>
                </div>

                <CardTitle className="text-3xl font-bold text-slate-800">
                  Welcome Back
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Sign in to access the admin dashboard
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="admin@pbts.et"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 pr-12"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Sign In to Dashboard
                      </div>
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-blue-800">Demo Credentials</p>
                    <Button
                      type="button"
                      onClick={quickFillCredentials}
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Quick Fill
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono bg-white px-2 py-1 rounded text-xs text-blue-600">
                      atlasAdmin@admin.com
                    </div>
                    <div className="font-mono bg-white px-2 py-1 rounded text-xs text-blue-600">
                      my_password
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Ethiopian Public Bus Transport System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}