import Link from 'next/link';
import { MINISTRIES } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MinistriesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Ministries (Read-Only)</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Ministries</CardTitle>
          <CardDescription>Static list of ministries (read-only).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MINISTRIES.map(ministry => (
                <TableRow key={ministry.id}>
                  <TableCell>
                    <Link href={`/admin/ministries/${ministry.id}`} className="text-blue-600 underline">
                      {ministry.name}
                    </Link>
                  </TableCell>
                  <TableCell>{ministry.leader}</TableCell>
                  <TableCell>{ministry.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}