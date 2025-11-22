'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Loader2 } from 'lucide-react';

// REALTIME DATABASE IMPORTS
// Using relative path ../../../lib/firebase assumes: app/admin/donations/page.tsx -> root/lib/firebase.ts
import { db } from '../../../lib/firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';

type DonationRecord = {
  id: string;
  name: string;
  amount: number;
  date: number; 
  campaign: string;
  email?: string;
  phone?: string;
  customReason?: string;
  paymentMethod?: string;
};

export default function DonationsPage() {
  const [donationsData, setDonationsData] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Reference the donations node and order by date
    const donationsRef = query(ref(db, 'donations'), orderByChild('date'));

    // 2. Listen for changes
    const unsubscribe = onValue(donationsRef, (snapshot) => {
      const data: DonationRecord[] = [];
      
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        data.push({
          id: childSnapshot.key as string,
          ...item
        });
      });

      // 3. Realtime DB returns sorted ascending, so we reverse to show newest first
      setDonationsData(data.reverse());
      setLoading(false);
    }, (error) => {
      console.error("Error fetching donations:", error);
      setLoading(false);
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  const totalDonations = donationsData.reduce((sum, d) => sum + d.amount, 0);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto p-4 md:p-6 space-y-8 w-full max-w-7xl">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Donation Tracking</h1>
        {loading && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
          <CardDescription>
            Real-time record of all donations received. 
            <span className="ml-2 font-semibold text-primary">
              Total: ${totalDonations.toLocaleString()}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : donationsData.length === 0 ? (
             <div className="text-center py-10 text-muted-foreground">
               No donations recorded yet.
             </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Contact Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Campaign/Fund</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationsData.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{donation.email || 'No email'}</span>
                        </div>
                        {donation.phone && (
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{donation.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(donation.date)}
                    </TableCell>
                    <TableCell>
                      {donation.campaign === 'custom' ? (
                        <div className="flex flex-col items-start gap-1">
                          <Badge variant="secondary">Specific Cause</Badge>
                          {donation.customReason && (
                            <span className="text-xs font-medium italic text-muted-foreground">
                              "{donation.customReason}"
                            </span>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="capitalize">
                          {donation.campaign?.replace('-', ' ')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground uppercase">
                        {donation.paymentMethod || 'Card'}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${donation.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}