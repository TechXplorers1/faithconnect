'use client';

import { useState } from 'react';
import { SermonCard, SermonVideoModal } from '@/components/sermon-card';
import { useSermons } from '@/context/sermon-context';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import type { Sermon } from '@/lib/definitions';

export default function SermonsPage() {
  const { sermons } = useSermons();
  const [playingSermon, setPlayingSermon] = useState<Sermon | null>(null);
  
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories for the dropdown
  const categories = [...new Set(sermons.map(s => s.category))];

  // Filter logic
  const filteredSermons = sermons.filter((sermon) => {
    const query = searchQuery.toLowerCase();
    
    // UPDATED: Removed 'description' from the search check to fix the TypeScript error.
    // We use (value || '') to prevent crashes if a field happens to be empty/undefined.
    const matchesSearch = 
      (sermon.title || '').toLowerCase().includes(query) || 
      (sermon.speaker || '').toLowerCase().includes(query) ||
      (sermon.category || '').toLowerCase().includes(query);

    const matchesCategory = selectedCategory === 'all' || sermon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background">
      {playingSermon && (
        <SermonVideoModal
          sermon={playingSermon}
          onClose={() => setPlayingSermon(null)}
        />
      )}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Sermon Library</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore past sermons. Be inspired and challenged by messages of faith, hope, and love.
        </p>
      </header>
      
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search sermons..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All Categories</SelectItem>
               {categories.map(category => (
                 <SelectItem key={category} value={category}>{category}</SelectItem>
               ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.length > 0 ? (
            filteredSermons.map((sermon) => (
              <SermonCard 
                key={sermon.id} 
                sermon={sermon} 
                onPlay={() => setPlayingSermon(sermon)} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No sermons found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}