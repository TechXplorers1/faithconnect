'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Sermon } from '@/lib/definitions';
import { SERMONS as initialSermons } from '@/lib/placeholder-data';

interface SermonContextType {
  sermons: Sermon[];
  addSermon: (sermon: Omit<Sermon, 'id'>) => void;
  updateSermon: (sermon: Sermon) => void;
  deleteSermon: (id: string) => void;
  getSermonById: (id: string) => Sermon | undefined;
}

const SermonContext = createContext<SermonContextType | undefined>(undefined);

export function SermonProvider({ children }: { children: ReactNode }) {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);

  const addSermon = (sermon: Omit<Sermon, 'id'>) => {
    const newSermon = { ...sermon, id: Date.now().toString() };
    setSermons(prevSermons => [newSermon, ...prevSermons]);
  };

  const updateSermon = (updatedSermon: Sermon) => {
    setSermons(prevSermons => prevSermons.map(sermon => sermon.id === updatedSermon.id ? updatedSermon : sermon));
  };

  const deleteSermon = (id: string) => {
    setSermons(prevSermons => prevSermons.filter(sermon => sermon.id !== id));
  };

  const getSermonById = (id: string) => {
    return sermons.find(sermon => sermon.id === id);
  };

  return (
    <SermonContext.Provider value={{ sermons, addSermon, updateSermon, deleteSermon, getSermonById }}>
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
