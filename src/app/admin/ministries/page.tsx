'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, ClipboardList, Users, UserPlus, CheckCircle2, Clock, List } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMinistries } from '@/context/ministry-context';
import { Ministry } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- MOCK DATA FOR REQUESTS ---
const VOLUNTEER_REQUESTS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "555-0123", interests: ["KidsConnect", "Greeting"], date: "2023-11-20", status: "Pending" },
  { id: 2, name: "Mike Ross", email: "mike.r@example.com", phone: "555-0124", interests: ["Tech & Media Team"], date: "2023-11-19", status: "Reviewing" },
  { id: 3, name: "Jessica Pearson", email: "jessica@example.com", phone: "555-0125", interests: ["Worship & Arts"], date: "2023-11-18", status: "Contacted" },
  { id: 4, name: "Rachel Zane", email: "rachel@example.com", phone: "555-0126", interests: ["Food Pantry"], date: "2023-11-18", status: "Pending" },
];

const MEMBERSHIP_REQUESTS = [
  { id: 1, name: "Louis Litt", email: "louis@example.com", phone: "555-0199", date: "2023-11-21", status: "New" },
  { id: 2, name: "Harvey Specter", email: "harvey@example.com", phone: "555-0198", date: "2023-11-20", status: "Scheduled Interview" },
  { id: 3, name: "Donna Paulsen", email: "donna@example.com", phone: "555-0197", date: "2023-11-20", status: "New" },
];

export default function MinistriesAdminPage() {
  const router = useRouter();
  const { ministries, deleteMinistry } = useMinistries();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ministryToDelete, setMinistryToDelete] = useState<Ministry | null>(null);

  const handleDeleteClick = (ministry: Ministry) => {
    setMinistryToDelete(ministry);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ministryToDelete) {
      deleteMinistry(ministryToDelete.id);
      toast({
        title: 'Ministry Deleted',
        description: `The ministry "${ministryToDelete.name}" has been successfully deleted.`,
      });
      setMinistryToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Ministry Management</h1>
         <Button asChild><Link href="/admin/ministries/new"><PlusCircle className="mr-2 h-4 w-4"/> Create Ministry</Link></Button>
      </div>

      {/* OUTER TABS: Switch between List and Request Section */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" /> All Ministries
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Join Requests
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {VOLUNTEER_REQUESTS.length + MEMBERSHIP_REQUESTS.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: EXISTING MINISTRY LIST */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Ministries</CardTitle>
              <CardDescription>Manage your church's ministries and programs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ministry Name</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ministries.map(ministry => (
                    <TableRow key={ministry.id}>
                      <TableCell className="font-medium">{ministry.name}</TableCell>
                      <TableCell>{ministry.leader || 'N/A'}</TableCell>
                      <TableCell className="max-w-sm truncate">{ministry.description}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/admin/ministries/edit/${ministry.id}`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(ministry)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: REQUESTS SECTION */}
        <TabsContent value="requests" className="space-y-4">
          
          {/* INNER TABS: Switch between Volunteer and Membership */}
          <Tabs defaultValue="volunteer" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="volunteer">Volunteer Apps ({VOLUNTEER_REQUESTS.length})</TabsTrigger>
                <TabsTrigger value="membership">Membership ({MEMBERSHIP_REQUESTS.length})</TabsTrigger>
              </TabsList>
            </div>

            {/* INNER TAB 1: VOLUNTEER TABLE */}
            <TabsContent value="volunteer" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Volunteer Applications
                  </CardTitle>
                  <CardDescription>Recent submissions from people wanting to serve.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {VOLUNTEER_REQUESTS.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">{req.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {req.interests.map((interest, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{req.email}</div>
                            <div className="text-xs text-muted-foreground">{req.phone}</div>
                          </TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-1 text-sm ${req.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                              {req.status === 'Pending' ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                              {req.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* INNER TAB 2: MEMBERSHIP TABLE */}
            <TabsContent value="membership" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Membership Requests
                  </CardTitle>
                  <CardDescription>People interested in officially joining the church.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Date Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MEMBERSHIP_REQUESTS.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">{req.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{req.email}</div>
                            <div className="text-xs text-muted-foreground">{req.phone}</div>
                          </TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                              {req.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">Contact</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
          </Tabs>
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ministry
              <span className="font-bold"> "{ministryToDelete?.name}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}