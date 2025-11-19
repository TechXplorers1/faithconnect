import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Sermon } from '@/lib/definitions';
import { PlayCircle, Mic, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SermonCardProps {
  sermon: Sermon;
  featured?: boolean;
}

export function SermonCard({ sermon, featured = false }: SermonCardProps) {
  const sermonImage = sermon.coverImage ? PlaceHolderImages.find(p => p.id === sermon.coverImage) : null;
  const imageUrl = sermon.coverImageUrl || sermonImage?.imageUrl;

  const cardContent = (
    <>
      {imageUrl && (
        <div className={cn("relative overflow-hidden", featured ? "md:w-1/2" : "w-full h-48")}>
          <Image
            src={imageUrl}
            alt={sermon.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={sermonImage?.imageHint}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white/80 transform transition-transform group-hover:scale-110" />
          </div>
        </div>
      )}
      <div className={cn("flex flex-col", featured ? "md:w-1/2" : "w-full")}>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{sermon.category}</Badge>
          <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
            {sermon.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-sm text-muted-foreground space-y-2 mb-4">
              <div className="flex items-center gap-2"><Mic /><span>{sermon.speaker}</span></div>
              <div className="flex items-center gap-2"><Calendar /><span>{new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
          </div>
          <p className="text-muted-foreground line-clamp-3">{sermon.summary}</p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto">
            Watch or Listen Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </>
  );

  return (
    <Link href={`/sermons/${sermon.id}`} className="group">
      <Card className={cn("overflow-hidden h-full flex flex-col transition-all hover:shadow-xl", featured ? "md:flex-row" : "flex-col")}>
        {cardContent}
      </Card>
    </Link>
  );
}
