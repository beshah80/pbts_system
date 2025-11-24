'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { submitFeedback } from '@/lib/api';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    category: '',
    message: '',
    routeId: '',
    rating: 5,
    email: '',
    verificationCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [remainingChars, setRemainingChars] = useState(500);

  const sendVerificationCode = async () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, action: 'send' })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setShowVerification(true);
        setError(`Code sent! For demo, use: ${result.demoCode}`);
      } else {
        setError(result.error || 'Failed to send verification code');
      }
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyCode = async () => {
    if (!formData.verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          action: 'verify', 
          code: formData.verificationCode 
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setIsEmailVerified(true);
        setShowVerification(false);
        setError(null);
      } else {
        setError(result.error || 'Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setError('Please verify your email first');
      return;
    }

    if (!formData.category || !formData.message.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.message.length > 500) {
      setError('Message must be 500 characters or less');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitFeedback({
        passengerName: 'Verified User',
        passengerEmail: formData.email,
        category: formData.category,
        message: formData.message,
        routeId: formData.routeId || undefined,
        rating: formData.rating
      });

      setIsSubmitted(true);
    } catch (err: any) {
      if (err.message.includes('rate limit')) {
        setError('You have reached the daily limit of 3 feedbacks. Please try again tomorrow.');
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setFormData(prev => ({ ...prev, message: value }));
      setRemainingChars(500 - value.length);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">Your feedback has been submitted successfully. We appreciate your input!</p>
            <Link href="/home">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Share Your Feedback</h1>
              <p className="text-blue-100">Help us improve our bus service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              We Value Your Opinion
            </CardTitle>
            <p className="text-gray-600">
              Your feedback helps us provide better service for all passengers
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Verification Section */}
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isEmailVerified ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {isEmailVerified ? '✓' : '1'}
                  </div>
                  <h3 className="font-semibold text-gray-900">Verify Your Email</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={isEmailVerified}
                      className={`flex-1 h-11 ${
                        isEmailVerified ? 'bg-green-50 border-green-300' : ''
                      }`}
                    />
                    {!isEmailVerified && (
                      <Button
                        type="button"
                        onClick={sendVerificationCode}
                        disabled={isVerifying || !formData.email}
                        className="px-6 h-11 bg-blue-600 hover:bg-blue-700"
                      >
                        {isVerifying ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Sending
                          </div>
                        ) : (
                          'Send Code'
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {showVerification && !isEmailVerified && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        We've sent a 6-digit code to <strong>{formData.email}</strong>
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter 6-digit code"
                          value={formData.verificationCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, verificationCode: e.target.value }))}
                          maxLength={6}
                          className="flex-1 h-11 text-center text-lg font-mono tracking-widest"
                        />
                        <Button
                          type="button"
                          onClick={verifyCode}
                          disabled={!formData.verificationCode}
                          className="px-6 h-11 bg-green-600 hover:bg-green-700"
                        >
                          Verify
                        </Button>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <button
                          type="button"
                          onClick={sendVerificationCode}
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Resend code
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowVerification(false);
                            setFormData(prev => ({ ...prev, verificationCode: '' }));
                          }}
                          className="text-sm text-gray-600 hover:text-gray-800"
                        >
                          Change email
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {isEmailVerified && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Email verified successfully!</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        You can now submit your feedback
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields - Only show when email is verified */}
              {isEmailVerified && (
                <>
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Category *
                    </label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SERVICE">🚌 Service Quality</SelectItem>
                        <SelectItem value="PUNCTUALITY">⏰ Punctuality</SelectItem>
                        <SelectItem value="CLEANLINESS">🧽 Cleanliness</SelectItem>
                        <SelectItem value="SAFETY">🛡️ Safety Concerns</SelectItem>
                        <SelectItem value="DRIVER_BEHAVIOR">👨‍✈️ Driver Behavior</SelectItem>
                        <SelectItem value="OTHER">📝 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Route ID (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route Number (Optional)
                    </label>
                    <Input
                      placeholder="e.g., R001, R002"
                      value={formData.routeId}
                      onChange={(e) => setFormData(prev => ({ ...prev, routeId: e.target.value }))}
                      className="h-12"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating *
                    </label>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingClick(rating)}
                          className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                            formData.rating >= rating
                              ? 'text-yellow-500 bg-yellow-50'
                              : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-50'
                          }`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {formData.rating === 1 && '😞 Very Poor'}
                      {formData.rating === 2 && '😕 Poor'}
                      {formData.rating === 3 && '😐 Average'}
                      {formData.rating === 4 && '😊 Good'}
                      {formData.rating === 5 && '😍 Excellent'}
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback * <span className="text-xs text-gray-500">(Max 500 characters)</span>
                    </label>
                    <Textarea
                      placeholder="Please share your experience, suggestions, or concerns..."
                      rows={5}
                      value={formData.message}
                      onChange={handleMessageChange}
                      className="resize-none"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">Be specific to help us improve</p>
                      <p className={`text-xs ${
                        remainingChars < 50 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {remainingChars} characters remaining
                      </p>
                    </div>
                  </div>

                  {/* Daily Limit Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm">
                      📊 Daily limit: 3 feedbacks per email to maintain quality
                    </p>
                  </div>
                </>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !isEmailVerified}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Feedback...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}