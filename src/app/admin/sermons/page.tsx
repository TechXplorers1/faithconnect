import Link from 'next/link';
import { SERMONS } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function SermonsPage() {
  return (
    <div className="mx-auto p-4 md:p-6 space-y-8 w-full max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Sermon Library (Read-Only)</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sermons</CardTitle>
          <CardDescription>Static list of sermons (read-only).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SERMONS.map(sermon => (
                <TableRow key={sermon.id}>
                  <TableCell>{sermon.title}</TableCell>
                  <TableCell>{sermon.speaker}</TableCell>
                  <TableCell><Badge variant="outline">{sermon.category}</Badge></TableCell>
                  <TableCell>{new Date(sermon.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}