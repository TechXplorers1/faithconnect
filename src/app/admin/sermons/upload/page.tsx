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

const formSchema = z.object({
  title: z.string().min(5),
  speaker: z.string().min(2),
  date: z.string(),
  category: z.string(),
  summary: z.string().min(20),
  videoUrl: z.string().url().optional().or(z.literal('')),
  audioFile: z.any().optional(),
});

// Mock AI function
const generateMockSummary = (title: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const summary = `This sermon, titled "${title}," explores profound themes of faith and redemption. It delves into the importance of community, the power of forgiveness, and how ancient scripture provides timeless guidance for modern challenges. Listeners are encouraged to reflect on their personal journey and find strength in shared belief.`;
            resolve(summary);
        }, 1500);
    });
};

export default function SermonUploadPage() {
  const { toast } = useToast();
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
      const generatedSummary = await generateMockSummary(title);
      form.setValue("summary", generatedSummary);
      setIsGenerating(false);
      toast({ title: "Summary Generated!", description: "The AI-powered summary has been added."});
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Sermon Uploaded!',
      description: `"${values.title}" has been successfully added to the library.`,
    });
    form.reset();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
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
                        <FormField control={form.control} name="audioFile" render={({ field }) => (<FormItem><FormLabel>Audio File (MP3)</FormLabel><FormControl><Input type="file" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>

                    <Button type="submit">Upload Sermon</Button>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
