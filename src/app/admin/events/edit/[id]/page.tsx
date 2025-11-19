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
import { useEvents } from '@/context/event-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Event } from '@/lib/definitions';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(3, 'Location is required'),
  description: z.string().min(10, 'Description is required'),
  image: z.any().optional(),
});

export default function EditEventPage() {
  const { toast } = useToast();
  const { updateEvent, getEventById } = useEvents();
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  const event = getEventById(eventId);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    },
  });

  useEffect(() => {
    if (event) {
        form.reset({
            ...event,
            date: event.date.split('T')[0], // Format date for input
        });
    }
  }, [event, form]);

  if (!event) {
    return <div className="p-8">Event not found.</div>;
  }

  function onSubmit(values: z.infer<typeof eventSchema>) {
    const handleImage = (file: File, callback: (imageUrl?: string) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            callback(event?.imageUrl);
        }
    };

    handleImage(values.image?.[0], (imageUrl) => {
        const updatedEvent: Event = {
            ...event,
            ...values,
            imageUrl: imageUrl,
            image: values.image?.[0] ? '' : event.image, // clear placeholder if new image
        };
        updateEvent(updatedEvent);
        
        toast({
          title: 'Event Updated!',
          description: `The event "${values.title}" has been successfully updated.`,
        });

        router.push('/admin/events');
    });
  }

  return (
     <div className="container mx-auto p-4 md:p-6 space-y-8">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/events"><ArrowLeft /></Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Event</h1>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Update the details for your event.</CardDescription>
        </CardHeader>
        <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="time" render={({ field }) => (
                        <FormItem><FormLabel>Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
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
