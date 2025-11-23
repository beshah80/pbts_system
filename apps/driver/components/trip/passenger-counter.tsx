'use client';

import { useState } from 'react';
import { Users, Plus, Minus, RotateCcw } from 'lucide-react';

interface PassengerCounterProps {
  initialCount?: number;
  maxCapacity?: number;
  onCountChange: (count: number) => void;
}

export function PassengerCounter({ 
  initialCount = 0, 
  maxCapacity = 50, 
  onCountChange 
}: PassengerCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [boardingCount, setBoardingCount] = useState(0);
  const [alightingCount, setAlightingCount] = useState(0);

  const updateCount = (newCount: number) => {
    const validCount = Math.max(0, Math.min(newCount, maxCapacity));
    setCount(validCount);
    onCountChange(validCount);
  };

  const handleBoarding = (increment: number) => {
    const newBoardingCount = Math.max(0, boardingCount + increment);
    setBoardingCount(newBoardingCount);
    updateCount(count + increment);
  };

  const handleAlighting = (increment: number) => {
    const newAlightingCount = Math.max(0, alightingCount + increment);
    setAlightingCount(newAlightingCount);
    updateCount(count - increment);
  };

  const resetCounters = () => {
    setBoardingCount(0);
    setAlightingCount(0);
  };

  const getCapacityColor = () => {
    const percentage = (count / maxCapacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Passenger Count</h3>
        </div>
        <button
          onClick={resetCounters}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Current Count Display */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getCapacityColor()}`}>
          {count}
        </div>
        <div className="text-sm text-gray-600">
          of {maxCapacity} passengers
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              count >= maxCapacity * 0.9 ? 'bg-red-500' :
              count >= maxCapacity * 0.75 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((count / maxCapacity) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Boarding Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-800">Boarding</span>
            <span className="text-lg font-bold text-green-600">+{boardingCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBoarding(-1)}
              disabled={boardingCount === 0}
              className="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleBoarding(1)}
              disabled={count >= maxCapacity}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-800">Alighting</span>
            <span className="text-lg font-bold text-red-600">-{alightingCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAlighting(-1)}
              disabled={alightingCount === 0}
              className="w-8 h-8 rounded-full bg-red-200 text-red-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAlighting(1)}
              disabled={count === 0}
              className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 5, 10, 15].map((num) => (
          <button
            key={num}
            onClick={() => updateCount(count + num)}
            disabled={count + num > maxCapacity}
            className="py-2 px-3 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            +{num}
          </button>
        ))}
      </div>

      {count >= maxCapacity * 0.9 && (
        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-xs text-orange-700 text-center">
            Bus is near capacity
          </p>
        </div>
      )}
    </div>
  );
}