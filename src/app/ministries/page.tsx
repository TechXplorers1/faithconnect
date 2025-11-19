import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MINISTRIES } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function MinistriesPage() {
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
          {MINISTRIES.map(ministry => {
            const ministryImage = PlaceHolderImages.find(p => p.id === ministry.image);
            return (
              <Card key={ministry.id} className="overflow-hidden flex flex-col">
                {ministryImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={ministryImage.imageUrl}
                      alt={ministry.name}
                      fill
                      className="object-cover"
                      data-ai-hint={ministryImage.imageHint}
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{ministry.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{ministry.description}</p>
                  </CardContent>
                  {ministry.leader && (
                    <CardFooter>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        Led by {ministry.leader}
                      </div>
                    </CardFooter>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
