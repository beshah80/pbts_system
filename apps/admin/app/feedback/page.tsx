'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Star, Clock, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
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

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const filteredFeedback = useMemo(() => {
    return feedback.filter(item => {
      // Legacy filters
      const statusMatch = selectedStatus === 'ALL' || item.status === selectedStatus;
      const priorityMatch = selectedPriority === 'ALL' || item.priority === selectedPriority;
      
      if (!statusMatch || !priorityMatch) return false;
      
      // Text search
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        const searchText = `${item.message} ${item.category} ${item.adminResponse || ''}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }
      
      // Status filter from advanced search
      if (searchFilters.status && item.status !== searchFilters.status) {
        return false;
      }
      
      // Category filter
      if (searchFilters.category && item.category !== searchFilters.category) {
        return false;
      }
      
      // Priority filter from advanced search
      if (searchFilters.priority && item.priority !== searchFilters.priority) {
        return false;
      }
      
      // Date range filter
      if (searchFilters.dateRange?.start) {
        const feedbackDate = new Date(item.createdAt).toISOString().split('T')[0];
        if (feedbackDate < searchFilters.dateRange.start) return false;
      }
      if (searchFilters.dateRange?.end) {
        const feedbackDate = new Date(item.createdAt).toISOString().split('T')[0];
        if (feedbackDate > searchFilters.dateRange.end) return false;
      }
      
      return true;
    });
  }, [feedback, selectedStatus, selectedPriority, searchFilters]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkStatusUpdate = (status: Feedback['status']) => {
    selectedIds.forEach(id => {
      updateFeedback(id, { status });
    });
    setSelectedIds([]);
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Passenger Feedback</h1>
          <p className="text-gray-600">Manage and respond to passenger feedback</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-3xl font-bold text-blue-600">{stats.reviewed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-purple-600">{stats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="ml-2 border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="RESOLVED">Resolved</option>
                <option value="DISMISSED">Dismissed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="ml-2 border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="ALL">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdvancedSearch
        entityType="feedback"
        onFiltersChange={setSearchFilters}
        onClearFilters={() => setSearchFilters({})}
      />

      <BulkOperations
        entityType="feedback"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />

      {/* Quick Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">{selectedIds.length} selected:</span>
              <Button size="sm" onClick={() => handleBulkStatusUpdate('REVIEWED')}>Mark Reviewed</Button>
              <Button size="sm" onClick={() => handleBulkStatusUpdate('RESOLVED')}>Mark Resolved</Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate('DISMISSED')}>Dismiss</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectionChange(item.id, checked as boolean)}
                />
                <div className="flex justify-between items-start flex-1">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.category.replace('_', ' ')}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-sm text-gray-600">({item.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                {(() => {
                  const emailMatch = item.message.match(/\[Email: ([^\]]+)\]/);
                  const email = emailMatch ? emailMatch[1] : null;
                  const cleanMessage = item.message.replace(/\[Email: [^\]]+\]/, '').trim();
                  
                  return (
                    <>
                      {email && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Submitted by:</span>
                            <span className="text-sm text-blue-600 font-mono">{email}</span>
                          </div>
                        </div>
                      )}
                      <p className="text-gray-800 mb-2">{cleanMessage}</p>
                    </>
                  );
                })()}
                {item.adminResponse && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-3">
                    <p className="text-sm font-medium text-blue-800">Admin Response:</p>
                    <p className="text-blue-700">{item.adminResponse}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Route ID: {item.routeId}</span>
                  {item.busId && <span>Bus ID: {item.busId}</span>}
                  {item.driverId && <span>Driver ID: {item.driverId}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {item.status === 'PENDING' && (
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateFeedback(item.id, { status: 'REVIEWED' })}
                  >
                    Mark as Reviewed
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <FeedbackResponseForm feedback={item} onClose={() => {}} />
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateFeedback(item.id, { status: 'DISMISSED' })}
                  >
                    Dismiss
                  </Button>
                </div>
              )}
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