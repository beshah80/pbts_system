'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Star, Send, CheckCircle, AlertCircle, User, Mail, Phone } from 'lucide-react';
import { submitFeedback } from '@/lib/api';

interface FeedbackFormProps {
  routeId?: number;
  routeName?: string;
}

export default function FeedbackForm({ routeId, routeName }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    rating: 0,
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'Service Quality',
    'Bus Condition',
    'Driver Behavior',
    'Punctuality',
    'Route Issues',
    'Safety Concerns',
    'Accessibility',
    'General Feedback'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.passengerName.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your feedback message');
      return;
    }
    
    if (formData.rating === 0) {
      setErrorMessage('Please provide a rating');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitFeedback({
        ...formData,
        routeId: routeId,
        passengerEmail: formData.passengerEmail || undefined,
        passengerPhone: formData.passengerPhone || undefined
      });
      
      setSubmitStatus('success');
      setFormData({
        passengerName: '',
        passengerEmail: '',
        passengerPhone: '',
        rating: 0,
        category: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your input and will use it to improve our services.
          </p>
          <Button onClick={() => setSubmitStatus('idle')} className="bg-blue-600 hover:bg-blue-700">
            Submit Another Feedback
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Star className="w-5 h-5 text-white" />
          </div>
          Share Your Experience
        </CardTitle>
        {routeName && (
          <p className="text-gray-600 mt-2">Route: {routeName}</p>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Contact Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  value={formData.passengerName}
                  onChange={(e) => handleInputChange('passengerName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.passengerPhone}
                  onChange={(e) => handleInputChange('passengerPhone', e.target.value)}
                  placeholder="+251 9XX XXX XXX"
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.passengerEmail}
                onChange={(e) => handleInputChange('passengerEmail', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Overall Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`p-1 transition-colors ${
                    star <= formData.rating
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">
                {formData.rating > 0 && (
                  <>
                    {formData.rating} of 5 stars
                    {formData.rating === 5 && ' - Excellent!'}
                    {formData.rating === 4 && ' - Very Good'}
                    {formData.rating === 3 && ' - Good'}
                    {formData.rating === 2 && ' - Fair'}
                    {formData.rating === 1 && ' - Poor'}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback *
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please share your experience, suggestions, or concerns..."
              rows={5}
              className="w-full resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Your feedback helps us improve our services. Be specific about your experience.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting Feedback...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}