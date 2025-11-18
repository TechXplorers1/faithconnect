'use client';

import { EventCard } from '@/components/event-card';
import { useEvents } from '@/context/event-context';
import { CalendarDays } from 'lucide-react';

export default function EventsPage() {
  const { events } = useEvents();

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Upcoming Events</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          There's always something happening at FaithConnect. Find an event that interests you and get connected with our community.
        </p>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-12 bg-card rounded-lg border">
                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">No Upcoming Events</h2>
                <p className="mt-2 text-muted-foreground">Please check back soon for new events!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
