'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MessageSquare, HandHeart, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLiveStream } from '@/context/livestream-context';

export default function LiveStreamPage() {
  const streamImage = PlaceHolderImages.find(p => p.id === 'live-stream-header');
  const { liveStreamUrl, isLive } = useLiveStream();

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Watch Live</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Join our service online from anywhere in the world. Our next live stream begins Sunday at 10:00 AM.
        </p>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center text-white">
          {isLive && liveStreamUrl ? (
             <iframe
                width="100%"
                height="100%"
                src={liveStreamUrl}
                title="Live Stream Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          ) : (
            <>
              {streamImage ? (
                <Image
                    src={streamImage.imageUrl}
                    alt="Live stream placeholder"
                    fill
                    className="object-cover opacity-30"
                    data-ai-hint={streamImage.imageHint}
                />
              ) : <div className="absolute inset-0 bg-muted"/>}
              <div className="z-10 text-center p-8">
                <Radio className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-3xl font-bold font-headline">Stream is Currently Offline</h2>
                <p className="mt-2 text-lg">Our next service will be live on Sunday at 10:00 AM.</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            <Card>
                <CardHeader>
                    <Clock className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="font-headline mt-2">Service Times</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Join us live every Sunday at 10:00 AM for worship and a message of hope.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="font-headline mt-2">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Engage with our online community and pastoral team during the live service.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <HandHeart className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle className="font-headline mt-2">Online Giving</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Support our mission and ministries by giving online securely and easily.</p>
                    <Button asChild variant="link" className="mt-2">
                        <Link href="/give">Donate Now</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
