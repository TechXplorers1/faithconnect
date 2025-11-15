import { SermonCard } from '@/components/sermon-card';
import { SERMONS } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function SermonsPage() {
  const speakers = [...new Set(SERMONS.map(s => s.speaker))];
  const categories = [...new Set(SERMONS.map(s => s.category))];

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Sermon Library</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore past sermons. Be inspired and challenged by messages of faith, hope, and love.
        </p>
      </header>
      
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search sermons..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Speakers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Speakers</SelectItem>
              {speakers.map(speaker => <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All Categories</SelectItem>
               {categories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERMONS.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      </main>
    </div>
  );
}
