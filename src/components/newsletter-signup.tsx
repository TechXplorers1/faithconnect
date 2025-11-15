'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      toast({
        title: 'Subscription successful!',
        description: `Thank you for subscribing, ${email}!`,
      });
      setEmail('');
    } else {
       toast({
        title: 'Error',
        description: `Please enter a valid email address.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email for newsletter"
        required
      />
      <Button type="submit" aria-label="Subscribe to newsletter">
        <Mail className="h-4 w-4" />
      </Button>
    </form>
  );
}
