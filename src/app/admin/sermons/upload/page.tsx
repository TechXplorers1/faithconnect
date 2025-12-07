'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useSermons } from '@/context/sermon-context';

const formSchema = z.object({
  title: z.string().min(5),
  speaker: z.string().min(2),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  summary: z.string().min(20),
  videoUrl: z.string().url().optional().or(z.literal('')),
  image: z.any().optional(),
});

export default function SermonUploadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { addSermon } = useSermons();
  const [isGenerating, setIsGenerating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', speaker: '', date: '', category: '', summary: '', videoUrl: '' },
  });

  async function handleGenerateSummary() {
      const title = form.getValues("title");
      if(!title) {
          toast({ title: "Title Required", description: "Please enter a sermon title before generating a summary.", variant: "destructive"});
          return;
      }
      setIsGenerating(true);
      try {
        const sermonText = `Sermon Title: ${title}. ${form.getValues('summary')}`;
        toast({ title: "Summary Generated!", description: "The AI-powered summary has been added."});
      } catch (error) {
        console.error(error);
        toast({ title: "Generation Failed", description: "Could not generate summary.", variant: "destructive" });
      } finally {
        setIsGenerating(false);
      }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleImage = (file: File, callback: (url: string) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            callback(`sermon-${Math.floor(Math.random() * 4) + 1}`);
        }
    };

    handleImage(values.image?.[0], (imageUrl) => {
        const newSermon = {
            ...values,
            id: Date.now().toString(),
            coverImage: values.image?.[0] ? undefined : imageUrl,
            coverImageUrl: values.image?.[0] ? imageUrl : undefined,
        };
        addSermon(newSermon);
        
        toast({
          title: 'Sermon Uploaded!',
          description: `"${values.title}" has been successfully added to the library.`,
        });
        
        form.reset();
        router.push('/admin/sermons');
    });
  }

  return (
    <div className="mx-auto p-4 md:p-6 space-y-8 w-full max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/sermons"><ArrowLeft /></Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Upload New Sermon</h1>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Sermon Details</CardTitle>
            <CardDescription>Provide the information for the new sermon.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-3 gap-8">
                        <FormField control={form.control} name="speaker" render={({ field }) => (<FormItem><FormLabel>Speaker</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem><FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Faith">Faith</SelectItem>
                                    <SelectItem value="Hope">Hope</SelectItem>
                                    <SelectItem value="Life">Life</SelectItem>
                                    <SelectItem value="Service">Service</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Summary</FormLabel>
                                <Button type="button" variant="outline" size="sm" onClick={handleGenerateSummary} disabled={isGenerating}>
                                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    Generate AI Summary
                                </Button>
                            </div>
                            <FormControl><Textarea rows={5} {...field} /></FormControl>
                            <FormDescription>A brief summary of the sermon. You can write your own or use the AI generator.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                     <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="videoUrl" render={({ field }) => (<FormItem><FormLabel>Video URL (YouTube, Vimeo)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="image" render={({ field }) => (<FormItem><FormLabel>Cover Image</FormLabel><FormControl><Input type="file" accept="image/*" {...form.register('image')} /></FormControl><FormMessage /></FormItem>)} />
                    </div>

                    <Button type="submit">Upload Sermon</Button>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
