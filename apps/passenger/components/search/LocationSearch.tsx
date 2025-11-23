'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Search, X } from 'lucide-react';
import { searchLocationSuggestions, RealLocationData } from '@/lib/api';

interface LocationSearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: RealLocationData) => void;
}

export default function LocationSearch({ 
  placeholder, 
  value, 
  onChange, 
  onLocationSelect 
}: LocationSearchProps) {
  const [suggestions, setSuggestions] = useState<RealLocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocationSuggestions(value);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error searching locations:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        target &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (location: RealLocationData) => {
    setShowSuggestions(false);
    onChange(location.name);
    onLocationSelect?.(location);
  };

  const clearInput = () => {
    setShowSuggestions(false);
    setSuggestions([]);
    onChange('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="pl-10 pr-10"
        />
        {value && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((location) => (
            <button
              key={`${location.id}-${location.name}`}
              onClick={() => handleSuggestionClick(location)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 focus:outline-none focus:bg-slate-50"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 truncate">
                    {location.name}
                  </div>
                  {location.nameAmharic && location.nameAmharic !== location.name && (
                    <div className="text-sm text-slate-600 truncate">
                      {location.nameAmharic}
                    </div>
                  )}
                  {location.address && (
                    <div className="text-xs text-slate-500 truncate">
                      {location.address}
                    </div>
                  )}
                  {location.type && (
                    <div className="text-xs text-blue-600 mt-1">
                      {location.type.replace('amenity:', '').replace('_', ' ')}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}