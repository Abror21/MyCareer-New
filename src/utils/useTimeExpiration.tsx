import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimeContextType {
  timeExpiration: number | null;
  saveTimeExpiration: (expirationTime: number) => void;
}

const TimeContext = createContext<TimeContextType | null>(null);

export const TimeProvider = ({ children }: any) => {
  const [timeExpiration, setTimeExpiration] = useState<number | null>(() => {
    const expirationTime = sessionStorage.getItem('timeExpiration');
    if (expirationTime) {
      const currentTime = Date.now();
      const timeLeft = parseInt(expirationTime) - currentTime;
      if (timeLeft > 0) {
        return parseInt(expirationTime);
      } else {
        sessionStorage.removeItem('timeExpiration');
      }
    }
    return null;
  });

  useEffect(() => {
    if (timeExpiration !== null) {
      const timer = setTimeout(() => {
        setTimeExpiration(null);
        sessionStorage.removeItem('timeExpiration');
      }, timeExpiration - Date.now());

      return () => clearTimeout(timer);
    }
  }, [timeExpiration]);

  const saveTimeExpiration = (expirationTime: number) => {
    sessionStorage.setItem('timeExpiration', expirationTime.toString());
    setTimeExpiration(expirationTime);
  };

  return <TimeContext.Provider value={{ timeExpiration, saveTimeExpiration }}>{children}</TimeContext.Provider>;
};

export const useTimeExpiration = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTimeExpiration must be used within a TimeProvider');
  }
  return context;
};
