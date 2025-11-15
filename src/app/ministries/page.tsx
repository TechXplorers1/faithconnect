import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MINISTRIES } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div className="grid md:grid-cols-2 gap-8">
          {MINISTRIES.map(ministry => {
            const ministryImage = PlaceHolderImages.find(p => p.id === ministry.image);
            return (
              <Card key={ministry.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {ministryImage && (
                    <div className="relative h-48 sm:h-auto sm:w-1/3">
                      <Image
                        src={ministryImage.imageUrl}
                        alt={ministryImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={ministryImage.imageHint}
                      />
                    </div>
                  )}
                  <div className="sm:w-2/3">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">{ministry.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{ministry.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
