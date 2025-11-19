
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

export default function GivePage() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(Number(value));
  };

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Online Donation</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your generosity fuels our mission. Thank you for your faithful support.
        </p>
      </header>
      
      <main className="container mx-auto px-4 pb-16 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Donate to FaithConnect</CardTitle>
            <CardDescription>Select an amount and fill in your details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <div>
                <Label htmlFor="amount" className="text-lg font-semibold">Amount (USD)</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {suggestedAmounts.map(val => (
                    <Button
                      key={val}
                      variant="outline"
                      className={cn("py-6 text-lg", amount === val && !customAmount && 'bg-primary/10 border-primary')}
                      onClick={() => handleAmountClick(val)}
                    >
                      ${val}
                    </Button>
                  ))}
                </div>
                <div className="relative mt-4">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Custom Amount"
                    className="pl-10 py-6 text-lg"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label className="text-lg font-semibold">Frequency</Label>
                 <RadioGroup defaultValue="one-time" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                    </div>
                </RadioGroup>
              </div>

              <div className='space-y-2'>
                <Label htmlFor="fund" className="text-lg font-semibold">Fund</Label>
                <Select defaultValue='building-fund'>
                    <SelectTrigger id="fund">
                        <SelectValue placeholder="Select a fund" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tithes">Tithes & Offerings</SelectItem>
                        <SelectItem value="missions">Missions</SelectItem>
                        <SelectItem value="building-fund">Building Fund</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Personal Information</Label>
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-lg font-semibold">Card Details</Label>
                <div className="h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground flex items-center">
                    Secure payment field would be here.
                </div>
              </div>
              
          </CardContent>
          <CardFooter className="flex-col gap-4 items-stretch">
             <Button className="w-full py-6 text-lg" size="lg">
                <CreditCard className="mr-2"/> Donate ${amount > 0 ? amount : 0}
             </Button>
             <p className="text-xs text-muted-foreground text-center w-full">FaithConnect is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
