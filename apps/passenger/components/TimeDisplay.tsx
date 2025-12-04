'use client';

import { useEffect, useState } from 'react';

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // This will only run on the client side
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    // Update time immediately
    updateTime();
    
    // Update time every minute
    const interval = setInterval(updateTime, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-4xl font-extrabold text-white mt-2">
      {currentTime}
    </div>
  );
}
