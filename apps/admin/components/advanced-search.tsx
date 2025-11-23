'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X, Calendar, MapPin } from 'lucide-react';

interface SearchFilters {
  query: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
  location: string;
  category: string;
  priority: string;
}

interface AdvancedSearchProps {
  entityType: 'buses' | 'drivers' | 'schedules' | 'incidents' | 'feedback';
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

export function AdvancedSearch({ entityType, onFiltersChange, onClearFilters }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: '',
    dateRange: { start: '', end: '' },
    location: '',
    category: '',
    priority: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const emptyFilters: SearchFilters = {
      query: '',
      status: '',
      dateRange: { start: '', end: '' },
      location: '',
      category: '',
      priority: ''
    };
    setFilters(emptyFilters);
    onClearFilters();
  };

  const getStatusOptions = () => {
    switch (entityType) {
      case 'buses':
      case 'drivers':
        return ['ACTIVE', 'INACTIVE', 'MAINTENANCE'];
      case 'schedules':
        return ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DELAYED'];
      case 'incidents':
        return ['REPORTED', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED'];
      case 'feedback':
        return ['PENDING', 'REVIEWED', 'RESOLVED', 'DISMISSED'];
      default:
        return [];
    }
  };

  const getCategoryOptions = () => {
    switch (entityType) {
      case 'incidents':
        return ['BREAKDOWN', 'ACCIDENT', 'DELAY', 'MAINTENANCE', 'SAFETY', 'OTHER'];
      case 'feedback':
        return ['SERVICE', 'CLEANLINESS', 'PUNCTUALITY', 'SAFETY', 'DRIVER_BEHAVIOR', 'OTHER'];
      default:
        return [];
    }
  };

  const getPriorityOptions = () => {
    if (entityType === 'incidents' || entityType === 'feedback') {
      return ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    }
    return [];
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Advanced Search & Filters
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter className="w-4 h-4 mr-1" />
            {showAdvanced ? 'Hide' : 'Show'} Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${entityType}...`}
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {(filters.query || filters.status || filters.dateRange.start || filters.location || filters.category || filters.priority) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {getStatusOptions().map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date From
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location Filter */}
            {(entityType === 'incidents' || entityType === 'schedules') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Category Filter */}
            {getCategoryOptions().length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {getCategoryOptions().map(category => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Priority Filter */}
            {getPriorityOptions().length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Priorities</option>
                  {getPriorityOptions().map(priority => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Display */}
        {(filters.status || filters.dateRange.start || filters.location || filters.category || filters.priority) && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.status && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Status: {filters.status}
              </span>
            )}
            {filters.dateRange.start && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                From: {filters.dateRange.start}
              </span>
            )}
            {filters.dateRange.end && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                To: {filters.dateRange.end}
              </span>
            )}
            {filters.location && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                Location: {filters.location}
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                Category: {filters.category}
              </span>
            )}
            {filters.priority && (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                Priority: {filters.priority}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}