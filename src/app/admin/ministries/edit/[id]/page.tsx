
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMinistries } from '@/context/ministry-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Ministry } from '@/lib/definitions';

const ministrySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  leader: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  image: z.any().optional(),
});

export default function EditMinistryPage() {
  const { toast } = useToast();
  const { updateMinistry, getMinistryById } = useMinistries();
  const router = useRouter();
  const params = useParams();
  const ministryId = params.id as string;
  const ministry = getMinistryById(ministryId);

  const form = useForm<z.infer<typeof ministrySchema>>({
    resolver: zodResolver(ministrySchema),
    defaultValues: {
      name: '',
      leader: '',
      description: '',
    },
  });

  useEffect(() => {
    if (ministry) {
        form.reset(ministry);
    }
  }, [ministry, form]);

  if (!ministry) {
    return <div className="p-8">Ministry not found.</div>;
  }

  function onSubmit(values: z.infer<typeof ministrySchema>) {
    const handleImage = (file: File, callback: (imageUrl?: string) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            callback(ministry?.imageUrl);
        }
    };

    handleImage(values.image?.[0], (imageUrl) => {
        const updatedMinistry: Ministry = {
            ...ministry,
            ...values,
            imageUrl: imageUrl,
            image: values.image?.[0] ? '' : ministry.image, // clear placeholder if new image
        };
        updateMinistry(updatedMinistry);
        
        toast({
          title: 'Ministry Updated!',
          description: `The ministry "${values.name}" has been successfully updated.`,
        });

        router.push('/admin/ministries');
    });
  }

  return (
     <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/ministries"><ArrowLeft /></Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Ministry</h1>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Ministry Details</CardTitle>
            <CardDescription>Update the details for this ministry.</CardDescription>
        </CardHeader>
        <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="leader" render={({ field }) => (
                    <FormItem><FormLabel>Leader (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="image" render={({ field }) => (<FormItem><FormLabel>Cover Image (leave blank to keep current)</FormLabel><FormControl><Input type="file" accept="image/*" {...form.register('image')} /></FormControl><FormMessage /></FormItem>)} />
                    
                    <div className="flex justify-end gap-2">
                         <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                         <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
