'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '@/lib/definitions';
import { EVENTS as initialEvents } from '@/lib/placeholder-data';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [event, ...prevEvents]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
