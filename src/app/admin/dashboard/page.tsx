import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DollarSign, Users, Calendar, Video, HandHeart, Radio } from 'lucide-react';
import { DONATIONS, EVENTS, SERMONS } from '@/lib/placeholder-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  const totalDonations = DONATIONS.reduce((sum, d) => sum + d.amount, 0);
  const recentDonations = DONATIONS.slice(0, 5);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button asChild><Link href="/admin/sermons/upload">Upload Sermon</Link></Button>
          <Button asChild variant="outline"><Link href="/admin/events/new">Create Event</Link></Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{EVENTS.length}</div>
            <p className="text-xs text-muted-foreground">View all in events tab</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sermons</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SERMONS.length}</div>
            <p className="text-xs text-muted-foreground">Available in media library</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentDonations.map(donation => (
                        <TableRow key={donation.id}>
                            <TableCell>
                                <div className="font-medium">{donation.name}</div>
                            </TableCell>
                            <TableCell>{donation.campaign}</TableCell>
                            <TableCell className="text-right">${donation.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Quick Links</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/sermons"><Button variant="outline" className="w-full justify-start p-4 h-auto"><Video className="mr-2"/> Manage Sermons</Button></Link>
                    <Link href="/admin/events"><Button variant="outline" className="w-full justify-start p-4 h-auto"><Calendar className="mr-2"/> Manage Events</Button></Link>
                    <Link href="/admin/donations"><Button variant="outline" className="w-full justify-start p-4 h-auto"><HandHeart className="mr-2"/> View Donations</Button></Link>
                    <Link href="/admin/live-stream"><Button variant="outline" className="w-full justify-start p-4 h-auto"><Radio className="mr-2"/> Manage Live Stream</Button></Link>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
