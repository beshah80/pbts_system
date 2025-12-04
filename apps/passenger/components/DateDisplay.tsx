'use client';
import { useState, useEffect } from 'react';

export default function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This will only run on the client side
    const updateDate = () => {
      setFormattedDate(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
    };

    // Update date immediately
    updateDate();
    
    // Update date at midnight
    const now = new Date();
    const msUntilMidnight = new Date(now).setHours(24, 0, 0, 0) - now.getTime();
    const timeout = setTimeout(() => {
      updateDate();
      // Then update every 24 hours
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
    
    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-2xl font-bold text-blue-100">
      {formattedDate}
    </div>
  );
}
