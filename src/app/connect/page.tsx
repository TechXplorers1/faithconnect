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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const membershipSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
});

const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  message: z.string().optional(),
});

const volunteerInterests = [
  { id: 'kids', label: 'KidsConnect (Children\'s Ministry)' },
  { id: 'youth', label: 'Youth Ablaze (Youth Group)' },
  { id: 'worship', label: 'Worship & Arts Team' },
  { id: 'greeting', label: 'Greeting & Hospitality' },
  { id: 'tech', label: 'Tech & Media Team' },
  { id: 'outreach', label: 'Community Outreach' },
];

export default function ConnectPage() {
  const { toast } = useToast();

  const membershipForm = useForm<z.infer<typeof membershipSchema>>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { name: '', email: '', phone: '', address: '' },
  });

  const volunteerForm = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: '', email: '', phone: '', interests: [], message: '' },
  });

  function onMembershipSubmit(values: z.infer<typeof membershipSchema>) {
    console.log('Membership Application:', values);
    toast({ title: 'Application Submitted!', description: 'We will be in touch about the next steps for membership.' });
    membershipForm.reset();
  }

  function onVolunteerSubmit(values: z.infer<typeof volunteerSchema>) {
    console.log('Volunteer Application:', values);
    toast({ title: 'Thank You!', description: 'Thanks for your interest in volunteering. A ministry leader will contact you soon.' });
    volunteerForm.reset();
  }

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get Connected</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Ready to take the next step? Whether you're interested in becoming a member or serving on a team, this is the place to start.
        </p>
      </header>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="volunteer" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="membership">Become a Member</TabsTrigger>
          </TabsList>
          
          <TabsContent value="volunteer">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Sign-up</CardTitle>
                <CardDescription>Join a team and make a difference. Let us know where you're interested in serving.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...volunteerForm}>
                  <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-6">
                    {/* ... Volunteer form fields ... */}
                    <FormField control={volunteerForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={volunteerForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={volunteerForm.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField
                      control={volunteerForm.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <div className="mb-4"><FormLabel>Areas of Interest</FormLabel></div>
                          {volunteerInterests.map((item) => (
                            <FormField
                              key={item.id}
                              control={volunteerForm.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(field.value?.filter((value) => value !== item.id));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField control={volunteerForm.control} name="message" render={({ field }) => (<FormItem><FormLabel>Anything else we should know?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit">I'm Interested!</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle>Membership Application</CardTitle>
                <CardDescription>Interested in making FaithConnect your home church? Fill out the form below to start the membership process.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...membershipForm}>
                  <form onSubmit={membershipForm.handleSubmit(onMembershipSubmit)} className="space-y-6">
                    {/* ... Membership form fields ... */}
                    <FormField control={membershipForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={membershipForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={membershipForm.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={membershipForm.control} name="address" render={({ field }) => (<FormItem><FormLabel>Home Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit">Submit Application</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
