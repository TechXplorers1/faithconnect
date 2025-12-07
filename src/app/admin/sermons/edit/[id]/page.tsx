import { SERMONS } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SermonDetail({ params }: { params: { id: string } }) {
  const sermon = SERMONS.find(s => s.id === params.id);

  if (!sermon) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/sermons" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft /> Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{sermon.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sermon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Speaker:</strong> {sermon.speaker}</p>
          <p><strong>Date:</strong> {new Date(sermon.date).toLocaleDateString()}</p>
          <p><strong>Category:</strong> {sermon.category}</p>
          <p><strong>Summary:</strong> {sermon.summary}</p>
          {sermon.videoUrl && (
            <p><strong>Video:</strong> <a href={sermon.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Watch</a></p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Required for static export
export async function generateStaticParams() {
  return SERMONS.map(s => ({ id: s.id }));
}