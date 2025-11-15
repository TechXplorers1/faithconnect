'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, CreditCard, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            <CardDescription>Select an amount and payment method below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="one-time" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="one-time"><DollarSign className="mr-2 h-4 w-4" /> One Time</TabsTrigger>
                <TabsTrigger value="recurring"><Repeat className="mr-2 h-4 w-4" /> Recurring</TabsTrigger>
              </TabsList>
              <div className="pt-6">
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

              <div className="mt-6">
                <Label className="text-lg font-semibold">Payment Method</Label>
                <div className="mt-2 space-y-4">
                   <Button className="w-full py-6 text-lg" size="lg">
                        <CreditCard className="mr-2"/> Pay with Card (Stripe)
                   </Button>
                   <Button variant="outline" className="w-full py-6 text-lg" size="lg">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2"><title>PayPal</title><path d="M7.332 18.061h2.522l.62-3.953.155-.985.016-.118.001-.002c.038-.239.088-.475.15-.704.05-.18.1-.355.158-.521.121-.345.264-.644.43-.895.167-.25.362-.44.586-.569.224-.128.48-.192.766-.192.31 0 .58.079.812.237.232.158.42.385.563.68.143.295.232.65.267 1.062l-.001.002-.231 1.464-.624 3.953h2.373l.83-5.268h-2.133c-.027.009-.054.016-.08.024l-.002.001c-.138.056-.257.14-.356.253-.099.113-.173.245-.224.397-.05.152-.086.311-.108.478l-.055.353-.156.985-.62 3.953h-2.52l.962-6.108h2.648l.261-1.658H9.196l-.963 6.107zM16.033 18.061h2.52l.962-6.108h-2.52l-.962 6.108zM18.82 10.3h2.648l.288-1.831H19.12l.262-1.658h3.327l-.963 6.108h-2.647l-.262 1.658h-3.326l.962-6.108h2.373zM13.25 10.3h2.648l.288-1.831H13.55l.262-1.658h3.326l-.962 6.108h-2.647l-.262 16.58h-3.326l.962-6.108h2.373z"/></svg>
                        PayPal
                   </Button>
                   <Button variant="outline" className="w-full py-6 text-lg" size="lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 103.4" className="h-4 mr-2"><path d="M85.4 103.4h28.1L99.9 0H71.8zM248 101.4c0 1.1-.9 2-2 2h-40.4c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h40.4c1.1 0 2 .9 2 2v99.4zM161.8 103.4h28.1L176.3 0h-28.1zM119.5 0l-12.3 49-4-16.1h-26L64.9 83.1h28.1l5.9-23.7 3.9 15.8h28.1L156 0zM57.6 0L19.4 62.4 2.1 0H0v101.4c0 1.1.9 2 2 2h26.1v-55L44.2 101c.4.8 1.2 1.3 2.1 1.3H56c.9 0 1.7-.5 2.1-1.3l16.2-52.6v55h26.1c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H57.6z" fill="#030303"/></svg>
                        Flutterwave
                   </Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground text-center w-full">FaithConnect is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
