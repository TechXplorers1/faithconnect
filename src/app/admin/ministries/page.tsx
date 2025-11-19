
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMinistries } from '@/context/ministry-context';
import { Ministry } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ministry
              <span className="font-bold">"{ministryToDelete?.name}"</span>.
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
