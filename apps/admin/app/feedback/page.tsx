'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Archive, Bell, CheckCircle, Flag, MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const FEEDBACK_DATA = [
  {
    id: '1',
    rating: 4,
    tags: ['Cleanliness', 'Timing'],
    message: "The bus was clean and arrived on time, but the driver was a bit rude.",
    fullMessage: "The bus was clean and arrived on time, but the driver was a bit rude. I hope this can be addressed for future rides.",
    timeAgo: "2 hours ago",
    reporter: "John Doe",
    reporterType: "Passenger",
    status: 'new'
  },
  {
    id: '2',
    rating: 5,
    tags: ['Safety', 'Driver Behavior'],
    message: "Excellent driver, felt very safe throughout the journey. Highly recommend!",
    fullMessage: "Excellent driver, felt very safe throughout the journey. Highly recommend! The driving was smooth and professional.",
    timeAgo: "1 day ago",
    reporter: "Sarah Smith",
    reporterType: "Passenger",
    status: 'read'
  },
  {
    id: '3',
    rating: 2,
    tags: ['Comfort', 'Maintenance'],
    message: "Seats were torn and the AC wasn't working. Very uncomfortable ride.",
    fullMessage: "Seats were torn and the AC wasn't working. Very uncomfortable ride. It was a hot day and the windows were stuck too.",
    timeAgo: "3 days ago",
    reporter: "Mike Johnson",
    reporterType: "Passenger",
    status: 'read'
  },
  {
    id: '4',
    rating: 3,
    tags: ['Route Clarity'],
    message: "The route was confusing, and I almost missed my stop. Needs better signage.",
    fullMessage: "The route was confusing, and I almost missed my stop. Needs better signage inside the bus indicating upcoming stops.",
    timeAgo: "5 days ago",
    reporter: "Emily Davis",
    reporterType: "Passenger",
    status: 'read'
  },
  {
    id: '5',
    rating: 5,
    tags: ['Accessibility'],
    message: "Great service for passengers with disabilities. Ramp worked perfectly.",
    fullMessage: "Great service for passengers with disabilities. Ramp worked perfectly and the driver was very helpful.",
    timeAgo: "1 week ago",
    reporter: "David Wilson",
    reporterType: "Passenger",
    status: 'read'
  },
  {
    id: '6',
    rating: 1,
    tags: ['Driver Behavior', 'Safety'],
    message: "Driver was speeding and talking on the phone. Very unsafe!",
    fullMessage: "Driver was speeding and talking on the phone. Very unsafe! I felt threatened by the speed and lack of attention.",
    timeAgo: "1 week ago",
    reporter: "Lisa Brown",
    reporterType: "Passenger",
    status: 'new'
  }
];

const CATEGORIES = [
  'All Feedback',
  'Cleanliness',
  'Safety',
  'Timing',
  'Driver Behavior',
  'Comfort',
  'Maintenance',
  'Route Clarity',
  'Accessibility'
];

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Feedback');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string>(FEEDBACK_DATA[0].id);
  const [replyText, setReplyText] = useState('');

  const selectedFeedback = FEEDBACK_DATA.find(f => f.id === selectedFeedbackId) || FEEDBACK_DATA[0];

  const filteredFeedback = selectedCategory === 'All Feedback' 
    ? FEEDBACK_DATA 
    : FEEDBACK_DATA.filter(f => f.tags.includes(selectedCategory));

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
        <span className="ml-2 text-xs text-slate-500 font-medium">{rating}/5 Stars</span>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-x-hidden bg-slate-50">
      {/* Main Content */}
      <div className="flex-1 min-h-0 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Feedback Moderation</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[16rem_22rem_1fr] gap-4 md:gap-6">
        
        {/* Left: Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden min-w-0">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Categories</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Feedback List */}
        <div className="flex flex-col min-h-0 min-w-0">
          {/* Search/Filter if needed, skipping for now to match screenshot strictly or just using list */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {filteredFeedback.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedFeedbackId(item.id)}
                className={cn(
                  "bg-white p-5 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                  selectedFeedbackId === item.id
                    ? "border-blue-500 ring-1 ring-blue-500 shadow-sm"
                    : "border-slate-200 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-3.5 h-3.5",
                          star <= item.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{item.rating}/5 Stars</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-full border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-700 line-clamp-2 mb-3 leading-relaxed">
                  &quot;{item.message}&quot;
                </p>

                <div className="text-[11px] text-slate-400">
                  {item.timeAgo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-0 overflow-hidden min-w-0">
          {/* Details Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-slate-800 text-lg">Feedback Details</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-2 text-slate-600 border-slate-200">
                <Archive className="w-4 h-4" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-2 text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700">
                <Flag className="w-4 h-4" />
                Flag for Review
              </Button>
              <Button size="sm" className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <CheckCircle className="w-4 h-4" />
                Acknowledge
              </Button>
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mb-6">
              {renderStars(selectedFeedback.rating)}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFeedback.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>

            <blockquote className="text-lg text-slate-800 leading-relaxed mb-6 italic border-l-4 border-blue-500 pl-4 py-1 bg-slate-50/50 rounded-r-lg">
              &quot;{selectedFeedback.fullMessage}&quot;
            </blockquote>

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-10">
              <span>Reported by: <span className="font-medium text-slate-700">{selectedFeedback.reporter} ({selectedFeedback.reporterType})</span></span>
              <span>•</span>
              <span>{selectedFeedback.timeAgo}</span>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h3 className="font-bold text-slate-800 mb-4">Reply to Feedback</h3>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Type your reply here..." 
                  className="min-h-[120px] resize-none bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
