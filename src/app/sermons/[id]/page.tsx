import { SERMONS, SERMONS as OTHER_SERMONS } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Calendar, Lightbulb, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SermonDetailPage({ params }: { params: { id: string } }) {
  const sermon = SERMONS.find(s => s.id === params.id);

  if (!sermon) {
    notFound();
  }

  const sermonImage = PlaceHolderImages.find(p => p.id === sermon.coverImage);
  const otherSermons = OTHER_SERMONS.filter(s => s.id !== sermon.id).slice(0, 2);

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-12">
        <Badge variant="secondary" className="mb-2">{sermon.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{sermon.title}</h1>
        <div className="text-md text-muted-foreground mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2"><Mic /><span>{sermon.speaker}</span></div>
            <div className="flex items-center gap-2"><Calendar /><span>{new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              {sermon.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={sermon.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : sermonImage ? (
                 <Image
                    src={sermonImage.imageUrl}
                    alt={sermonImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={sermonImage.imageHint}
                />
              ) : null}
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList>
                <TabsTrigger value="summary"><FileText className="mr-2 h-4 w-4" />Summary</TabsTrigger>
                <TabsTrigger value="ai-insights"><Lightbulb className="mr-2 h-4 w-4" />AI Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 text-base text-muted-foreground prose max-w-none">
                <p>{sermon.summary}</p>
              </TabsContent>
              <TabsContent value="ai-insights" className="mt-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                           <Lightbulb className="h-5 w-5 text-primary" /> Generated Sermon Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                        <p>This AI-powered summary captures the key points of the sermon:</p>
                        <ul>
                            <li>The sermon emphasizes the transformative power of grace in everyday life, not just as a concept but as a lived experience.</li>
                            <li>It highlights three practical ways to extend grace to others: active listening, assuming the best intentions, and offering forgiveness freely.</li>
                            <li>A central theme is that receiving God's grace empowers us to be conduits of grace in our communities, creating a ripple effect of kindness and understanding.</li>
                        </ul>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold font-headline mb-4">More Sermons</h2>
            <div className="space-y-4">
              {otherSermons.map(other => {
                const otherImage = PlaceHolderImages.find(p => p.id === other.coverImage);
                return (
                    <Link href={`/sermons/${other.id}`} key={other.id} className="group">
                        <Card className="flex items-center gap-4 p-4 transition-shadow hover:shadow-md">
                        {otherImage && (
                            <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0">
                                <Image src={otherImage.imageUrl} alt={other.title} fill className="object-cover" data-ai-hint={otherImage.imageHint}/>
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary">{other.title}</h3>
                            <p className="text-xs text-muted-foreground">{other.speaker}</p>
                        </div>
                        </Card>
                    </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
