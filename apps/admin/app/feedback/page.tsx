'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Star, Clock, CheckCircle, XCircle, AlertTriangle, ArrowLeft, Bell } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FeedbackResponseForm } from '@/components/forms/feedback-response-form';
import { AdvancedSearch } from '@/components/advanced-search';
import { BulkOperations } from '@/components/bulk-operations';
import { Feedback } from '@/lib/data';

export default function FeedbackPage() {
  const feedback = useAdminStore((state) => state.feedback);
  const updateFeedback = useAdminStore((state) => state.updateFeedback);
  const loadFeedback = useAdminStore((state) => state.loadFeedback);
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | Feedback['status']>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<'ALL' | Feedback['priority']>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<any>({});
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    loadFeedback();
    
    // Check for new feedback every 30 seconds
    const interval = setInterval(() => {
      const currentCount = feedback.length;
      loadFeedback();
      
      // Show notification if new feedback is detected
      setTimeout(() => {
        if (feedback.length > currentCount) {
          setNotification('New feedback received!');
          setTimeout(() => setNotification(null), 5000);
        }
      }, 1000);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [loadFeedback, feedback.length]);

  const filteredFeedback = useMemo(() => {
    return feedback.filter(item => {
      // Rating filter
      if (searchFilters.rating && item.rating !== searchFilters.rating) {
        return false;
      }
      
      // Date filter
      if (searchFilters.date) {
        const feedbackDate = new Date(item.createdAt || item.submittedAt).toISOString().split('T')[0];
        if (feedbackDate !== searchFilters.date) return false;
      }
      
      return true;
    });
  }, [feedback, searchFilters]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleExport = () => {
    const selectedFeedback = feedback.filter(f => selectedIds.includes(f.id));
    const csvContent = selectedFeedback.map(f => 
      `"${f.contactInfo?.split(' - ')[1] || ''}","${f.rating}","${f.comment || ''}","${new Date(f.createdAt).toLocaleDateString()}"`
    ).join('\n');
    const blob = new Blob([`Email,Rating,Message,Date\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback.csv';
    a.click();
  };

  const handleDeleteSelected = async () => {
    if (confirm(`Delete ${selectedIds.length} feedback items?`)) {
      try {
        const response = await fetch('http://localhost:3005/api/feedback', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds })
        });
        if (response.ok) {
          loadFeedback();
          setSelectedIds([]);
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (confirm('Delete ALL feedback? This cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:3005/api/feedback', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          loadFeedback();
          setSelectedIds([]);
        }
      } catch (error) {
        console.error('Delete all failed:', error);
      }
    }
  };

  const stats = {
    total: feedback.length,
    pending: feedback.filter(f => f.status === 'PENDING').length,
    reviewed: feedback.filter(f => f.status === 'REVIEWED').length,
    resolved: feedback.filter(f => f.status === 'RESOLVED').length,
    avgRating: feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length || 0
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'DISMISSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Feedback['priority']) => {
    switch (priority) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: Feedback['category']) => {
    switch (category) {
      case 'SERVICE': return '🚌';
      case 'CLEANLINESS': return '🧹';
      case 'PUNCTUALITY': return '⏰';
      case 'SAFETY': return '🛡️';
      case 'DRIVER_BEHAVIOR': return '👨‍✈️';
      default: return '📝';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Passenger Feedback</h1>
              <p className="text-gray-600 mt-1">Manage and respond to passenger feedback</p>
            </div>
          </div>
          
          {/* Notification */}
          {notification && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
              <Bell className="w-4 h-4" />
              <span className="font-medium">{notification}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setNotification(null)}
                className="ml-2 h-6 w-6 p-0 hover:bg-blue-100"
              >
                ×
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Feedback</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Average Rating</p>
                <p className="text-3xl font-bold text-purple-900">{stats.avgRating.toFixed(1)}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="flex gap-4 items-center">
              <div>
                <label className="text-sm font-medium text-gray-700">Rating:</label>
                <select
                  value={searchFilters.rating || 'ALL'}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, rating: e.target.value === 'ALL' ? null : parseInt(e.target.value) }))}
                  className="ml-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">All Ratings</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date:</label>
                <input
                  type="date"
                  value={searchFilters.date || ''}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, date: e.target.value }))}
                  className="ml-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                {selectedIds.length > 0 ? (
                  <>
                    <span className="text-sm font-medium text-gray-700 bg-blue-50 px-2 py-1 rounded">
                      {selectedIds.length} selected
                    </span>
                    <Button size="sm" variant="outline" onClick={() => handleExport()} className="hover:bg-green-50">
                      Export CSV
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteSelected()}>
                      Delete Selected
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])} className="hover:bg-gray-100">
                      Clear
                    </Button>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Select items for bulk actions</span>
                )}
              </div>
              
              {feedback.length > 0 && (
                <Button variant="destructive" onClick={() => handleDeleteAll()} className="bg-red-500 hover:bg-red-600">
                  Delete All ({feedback.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-200 hover:border-l-blue-500 bg-white">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectionChange(item.id, checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-sm">
                        {item.contactInfo ? item.contactInfo.split(' - ')[1] || item.contactInfo : 'Unknown'}
                      </span>
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                        <div className="flex">{renderStars(item.rating || 5)}</div>
                        <span className="text-xs font-medium text-yellow-700">({item.rating || 5})</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {new Date(item.createdAt || item.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {item.comment || item.message || 'No message'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">No feedback matches the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}