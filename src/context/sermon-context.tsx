'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Sermon } from '@/lib/definitions';
import { SERMONS as initialSermons } from '@/lib/placeholder-data';

interface SermonContextType {
  sermons: Sermon[];
  addSermon: (sermon: Sermon) => void;
}

const SermonContext = createContext<SermonContextType | undefined>(undefined);

export function SermonProvider({ children }: { children: ReactNode }) {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);

  const addSermon = (sermon: Sermon) => {
    setSermons(prevSermons => [sermon, ...prevSermons]);
  };

  return (
    <SermonContext.Provider value={{ sermons, addSermon }}>
      {children}
    </SermonContext.Provider>
  );
}

export function useSermons() {
  const context = useContext(SermonContext);
  if (context === undefined) {
    throw new Error('useSermons must be used within a SermonProvider');
  }
  return context;
}
