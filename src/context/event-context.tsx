'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '@/lib/definitions';
import { EVENTS as initialEvents } from '@/lib/placeholder-data';

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };
  
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };


  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventById }}>
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
