'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SermonCard } from '@/components/sermon-card';
import { EventCard } from '@/components/event-card';
import {
  ArrowRight,
  MapPin,
  Clock,
  HandHeart,
} from 'lucide-react';
import { MINISTRIES } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSermons } from '@/context/sermon-context';
import { useEvents } from '@/context/event-context';

export default function Home() {
  const { sermons } = useSermons();
  const { events } = useEvents();
  const latestSermon = sermons[0];
  const recentEvents = events.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
            Welcome to FaithConnect
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Connecting our community through faith, fellowship, and service.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/visit">New Here? Plan Your Visit <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      <section id="service-times" className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-8">Join Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock /> Sunday Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Every Sunday at 10:00 AM</p>
                <p className="text-muted-foreground">Join us for a time of worship, teaching, and community.</p>
              </CardContent>
            </Card>
            <Card className="text-left">
               <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin /> Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">123 Faith Ave, Community City, 12345</p>
                <Link href="/visit" className="text-primary hover:underline">Get Directions</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {latestSermon && (
        <section id="latest-sermon" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-8">Latest Sermon</h2>
            <div className="max-w-4xl mx-auto">
              <SermonCard sermon={latestSermon} featured={true} />
            </div>
          </div>
        </section>
      )}

      <section id="upcoming-events" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Upcoming Events</h2>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section id="ministries" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-8">Our Ministries</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            There's a place for everyone at FaithConnect. Discover a ministry where you can grow, serve, and belong.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINISTRIES.slice(0, 3).map(ministry => {
               const ministryImage = PlaceHolderImages.find(p => p.id === ministry.image);
              return (
                <Link href="/ministries" key={ministry.id}>
                  <Card className="overflow-hidden group text-left transform transition-all hover:-translate-y-2 hover:shadow-xl">
                    {ministryImage && (
                       <div className="relative h-48">
                         <Image
                          src={ministryImage.imageUrl}
                          alt={ministryImage.description}
                          fill
                          className="object-cover"
                          data-ai-hint={ministryImage.imageHint}
                        />
                       </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline">{ministry.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{ministry.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
           <Button asChild size="lg" className="mt-12">
              <Link href="/ministries">Explore All Ministries</Link>
            </Button>
        </div>
      </section>
      
      <section id="giving" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
           <HandHeart className="mx-auto h-12 w-12 mb-4"/>
           <h2 className="text-3xl font-bold font-headline mb-4">Support Our Mission</h2>
           <p className="max-w-2xl mx-auto mb-8">
            Your generosity helps us continue our work in the community and beyond.
           </p>
           <Button asChild size="lg" variant="secondary">
              <Link href="/give">Donate Online</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
