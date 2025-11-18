import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Event } from '@/lib/definitions';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventImage = !event.imageUrl ? PlaceHolderImages.find(p => p.id === event.image) : null;
  const imageUrl = event.imageUrl || eventImage?.imageUrl;


  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={eventImage?.imageHint}
          />
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
           <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4" /><span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /><span>{event.time}</span></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /><span>{event.location}</span></div>
          <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{event.description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href="#">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
