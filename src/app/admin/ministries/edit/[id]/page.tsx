import { MINISTRIES } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MinistryDetail({ params }: { params: { id: string } }) {
  const ministry = MINISTRIES.find(m => m.id === params.id);

  if (!ministry) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/ministries" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft /> Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{ministry.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ministry Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Leader:</strong> {ministry.leader}</p>
          <p><strong>Description:</strong> {ministry.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Required for static export
export async function generateStaticParams() {
  return MINISTRIES.map(m => ({ id: m.id }));
}