import { EVENTS } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = EVENTS.find(e => e.id === params.id);

  if (!event) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft /> Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{event.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Required for static export
export async function generateStaticParams() {
  return EVENTS.map(e => ({ id: e.id }));
}