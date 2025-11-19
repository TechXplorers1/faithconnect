
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Ministry } from '@/lib/definitions';
import { MINISTRIES as initialMinistries } from '@/lib/placeholder-data';

interface MinistryContextType {
  ministries: Ministry[];
  addMinistry: (ministry: Omit<Ministry, 'id'>) => void;
  updateMinistry: (ministry: Ministry) => void;
  deleteMinistry: (id: string) => void;
  getMinistryById: (id: string) => Ministry | undefined;
}

const MinistryContext = createContext<MinistryContextType | undefined>(undefined);

export function MinistryProvider({ children }: { children: ReactNode }) {
  const [ministries, setMinistries] = useState<Ministry[]>(initialMinistries);

  const addMinistry = (ministry: Omit<Ministry, 'id'>) => {
    const newMinistry = { ...ministry, id: Date.now().toString() };
    setMinistries(prevMinistries => [newMinistry, ...prevMinistries]);
  };

  const updateMinistry = (updatedMinistry: Ministry) => {
    setMinistries(prevMinistries => prevMinistries.map(ministry => ministry.id === updatedMinistry.id ? updatedMinistry : ministry));
  };

  const deleteMinistry = (id: string) => {
    setMinistries(prevMinistries => prevMinistries.filter(ministry => ministry.id !== id));
  };

  const getMinistryById = (id: string) => {
    return ministries.find(ministry => ministry.id === id);
  };

  return (
    <MinistryContext.Provider value={{ ministries, addMinistry, updateMinistry, deleteMinistry, getMinistryById }}>
      {children}
    </MinistryContext.Provider>
  );
}

export function useMinistries() {
  const context = useContext(MinistryContext);
  if (context === undefined) {
    throw new Error('useMinistries must be used within a MinistryProvider');
  }
  return context;
}
