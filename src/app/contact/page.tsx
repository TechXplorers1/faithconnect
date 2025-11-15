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
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    form.reset();
  }

  return (
    <div className="bg-background">
       <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you. Whether you have a question, a prayer request, or just want to say hello, feel free to reach out.
        </p>
      </header>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-bold font-headline mb-6">Send us a Message</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl><Input placeholder="Question about service times" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl><Textarea placeholder="Your message here..." {...field} rows={5} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-8">
                <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full mt-1"><MapPin className="text-primary h-6 w-6" /></div>
                    <div>
                        <h3 className="font-semibold text-lg">Our Address</h3>
                        <p className="text-muted-foreground">123 Faith Ave, Community City, 12345</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full mt-1"><Phone className="text-primary h-6 w-6" /></div>
                    <div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <a href="tel:123-456-7890" className="text-muted-foreground hover:text-primary">(123) 456-7890</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full mt-1"><Mail className="text-primary h-6 w-6" /></div>
                    <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <a href="mailto:hello@faithconnect.com" className="text-muted-foreground hover:text-primary">hello@faithconnect.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full mt-1"><Clock className="text-primary h-6 w-6" /></div>
                    <div>
                        <h3 className="font-semibold text-lg">Service Times</h3>
                        <p className="text-muted-foreground">Sundays at 10:00 AM</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
