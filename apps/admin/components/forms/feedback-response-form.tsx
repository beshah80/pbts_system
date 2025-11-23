'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/lib/store';
import { Feedback } from '@/types';

interface FeedbackResponseFormProps {
  feedback: Feedback;
  onClose: () => void;
}

export function FeedbackResponseForm({ feedback, onClose }: FeedbackResponseFormProps) {
  const updateFeedback = useAdminStore((state) => state.updateFeedback);
  const [response, setResponse] = useState(feedback.adminResponse || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFeedback(feedback.id, {
      adminResponse: response,
      status: 'RESOLVED',
      updatedAt: new Date().toISOString()
    });
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Respond to Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium mb-1">Original Feedback:</p>
          <p className="text-sm text-gray-700">{feedback.message}</p>
          <p className="text-xs text-gray-500 mt-2">Rating: {feedback.rating}/5 stars</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Admin Response</label>
            <textarea
              required
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your response to the passenger..."
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Send Response
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}