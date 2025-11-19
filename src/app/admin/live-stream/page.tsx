'use client';

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
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLiveStream } from '@/context/livestream-context';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
  isLive: z.boolean(),
});

export default function LiveStreamAdminPage() {
  const { toast } = useToast();
  const { liveStreamUrl, setLiveStreamUrl, isLive, setIsLive } = useLiveStream();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      url: liveStreamUrl || '',
      isLive: isLive,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLiveStreamUrl(values.url || null);
    setIsLive(values.isLive);
    toast({
      title: 'Live Stream Updated!',
      description: 'Your live stream settings have been saved.',
    });
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Live Stream Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Stream Settings</CardTitle>
          <CardDescription>
            Control the live stream feed on your public website. Paste the YouTube or Vimeo embed URL below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Stream Embed URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/embed/..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This should be the embeddable URL from your streaming provider (e.g., YouTube, Vimeo).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isLive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Stream Status
                      </FormLabel>
                      <FormDescription>
                        Toggle this on to show the live stream player. Turn it off to show the 'Offline' message.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Save Settings</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
