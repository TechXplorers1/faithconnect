'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMinistries } from '@/context/ministry-context';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ministryNameToId } from '@/lib/utils';

export default function MinistriesPage() {
  const { ministries } = useMinistries();

  // Map ministry names to specific local image paths
  const ministryImages: Record<string, string> = {
    "Kids Ministry": "/kids-ministry.png",
    "Youth Ministry": "/youth-ministry.png",
    "Women's Ministry": "/women-ministry.png",
    "Men's Ministry": "/men-ministry.png",
    "Worship Arts": "/worshipart-ministry.png",
    "Community Outreach": "/community.png"
  };

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Ministries & Programs</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find your place at FaithConnect. We have ministries for all ages and stages of life, designed to help you grow in your faith and connect with others.
        </p>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map(ministry => {
            const ministryImage = PlaceHolderImages.find(p => p.id === ministry.image);
            // Use local image map if available, otherwise fall back to existing logic
            const imageUrl = ministryImages[ministry.name] || ministry.imageUrl || ministryImage?.imageUrl;
            const interestId = ministryNameToId(ministry.name);
            
            return (
              <Card key={ministry.id} className="overflow-hidden flex flex-col">
                {imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={ministry.name}
                      fill
                      className="object-cover"
                      data-ai-hint={ministryImage?.imageHint}
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="font-headline text-2xl">{ministry.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow pt-4">
                    <p className="text-muted-foreground">{ministry.description}</p>
                  </CardContent>
                  <CardFooter className="p-0 pt-4 flex flex-col items-start gap-4">
                    {ministry.leader && (
                        <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-4 w-4 mr-2" />
                            Led by {ministry.leader}
                        </div>
                    )}
                     <Button asChild variant="outline">
                        <Link href={`/connect?tab=volunteer&interest=${interestId}`}>
                            Join Team <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}