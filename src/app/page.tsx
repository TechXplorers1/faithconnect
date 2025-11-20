
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SermonCard, SermonVideoModal } from '@/components/sermon-card';
import { EventCard } from '@/components/event-card';
import {
  ArrowRight,
  MapPin,
  Clock,
  HandHeart,
  CalendarDays,
  Church,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSermons } from '@/context/sermon-context';
import { useEvents } from '@/context/event-context';
import { useMinistries } from '@/context/ministry-context';
import { useState } from 'react';
import type { Sermon } from '@/lib/definitions';

export default function Home() {
  const { sermons } = useSermons();
  const { events } = useEvents();
  const { ministries } = useMinistries();
  const [playingSermon, setPlayingSermon] = useState<Sermon | null>(null);

  const latestSermon = sermons[0];
  const recentEvents = events.slice(0, 3);
  const homeMinistries = ministries.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  
  return (
    <div className="flex flex-col">
      {playingSermon && (
        <SermonVideoModal
          sermon={playingSermon}
          onClose={() => setPlayingSermon(null)}
        />
      )}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
      >
        {heroImage && (
            <Image
              src="/hero-section.png"
              alt="Church Congregation Worshiping"
              fill
              // className="object-fill opacity-150"
              priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg leading-tight">
            Connecting People to Faith, Community, and Purpose
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Welcome to FaithConnect, a place to belong and grow. Join us this Sunday for an inspiring message of hope and community.
          </p>
           <Button asChild size="lg" className="mt-8 group bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/sermons">
              Watch The Latest Sermon <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="service-times" className="py-16 bg-background">
        <div className="container mx-auto px-4">
            <div className="bg-card p-8 rounded-lg shadow-md border max-w-5xl mx-auto">
                 <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <Clock className="h-10 w-10 text-primary mb-3" />
                        <h3 className="text-xl font-bold font-headline">Sunday Service</h3>
                        <p className="text-muted-foreground">10:00 AM</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <MapPin className="h-10 w-10 text-primary mb-3" />
                        <h3 className="text-xl font-bold font-headline">Our Location</h3>
                        <p className="text-muted-foreground">123 Faith Ave, Community City</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <Church className="h-10 w-10 text-primary mb-3" />
                        <h3 className="text-xl font-bold font-headline">New Here?</h3>
                        <Link href="/visit" className="text-primary hover:underline">Plan Your Visit</Link>
                    </div>
                 </div>
            </div>
        </div>
      </section>
      
      {latestSermon && (
        <section id="latest-sermon" className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-2">Latest Message</h2>
             <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                Catch up on our most recent sermon and dive deeper into the Word.
            </p>
            <div className="max-w-4xl mx-auto">
              <SermonCard sermon={latestSermon} featured={true} onPlay={() => setPlayingSermon(latestSermon)}/>
            </div>
          </div>
        </section>
      )}

      <section id="upcoming-events" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Upcoming Events</h2>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEvents.length > 0 ? (
                recentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
            ) : (
                <div className="col-span-full text-center py-12 bg-card rounded-lg border">
                    <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">No Upcoming Events</h2>
                    <p className="mt-2 text-muted-foreground">Please check back soon for new events!</p>
                </div>
            )}
          </div>
        </div>
      </section>

     <section id="ministries" className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-2">Find Your Community</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            There's a place for everyone at FaithConnect. Discover a ministry where you can grow, serve, and belong.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeMinistries.map(ministry => {
               // 1. Try to find image by ID first (existing logic)
               const ministryImage = PlaceHolderImages.find(p => p.id === ministry.image);
               let imageUrl = ministry.imageUrl || ministryImage?.imageUrl;

               // 2. UPDATED: Explicitly set paths for Youth and Women's ministries
               // This overrides the default if the name matches, ensuring the correct image is used.
               const name = ministry.name.toLowerCase();
               if (name.includes('youth')) {
                 imageUrl = '/youth-ministry.png';
               } else if (name.includes('women')) {
                 imageUrl = '/women-ministry.png';
               }

              return (
                <Link href="/ministries" key={ministry.id}>
                  <Card className="overflow-hidden group text-left transform transition-all hover:-translate-y-2 hover:shadow-xl">
                    {imageUrl && (
                      <div className="relative h-48">
                        <Image
                          src={imageUrl}
                          alt={ministry.name}
                          fill
                          className="object-cover"
                          data-ai-hint={ministryImage?.imageHint}
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
           <Button asChild size="lg" className="mt-12 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/ministries">Explore All Ministries</Link>
            </Button>
        </div>
      </section>
      
      <section id="giving" className="py-20 bg-primary text-primary-foreground">
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

       <section id="visit" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
            <Church className="mx-auto h-12 w-12 mb-4 text-primary"/>
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Visit?</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                We'd love to meet you in person. Plan your visit this Sunday and experience our community firsthand.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/visit">Plan Your Visit <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
       </section>
    </div>
  );
}
