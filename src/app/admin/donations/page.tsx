import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DONATIONS } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

export default function DonationsPage() {
    const totalDonations = DONATIONS.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Donation Tracking</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
          <CardDescription>A record of all donations received. Total: ${totalDonations.toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Campaign/Fund</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DONATIONS.map(donation => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.name}</TableCell>
                  <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="outline">{donation.campaign}</Badge></TableCell>
                  <TableCell className="text-right">${donation.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
