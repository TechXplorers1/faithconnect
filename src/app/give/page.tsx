'use client';

import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, CreditCard, Shield, CheckCircle, Lock, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// REALTIME DATABASE IMPORTS
// Using relative path ../../lib/firebase assumes: app/give/page.tsx -> root/lib/firebase.ts
import { db } from '../../lib/firebase'; 
import { ref, push, set, serverTimestamp } from 'firebase/database';

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

// --- MOCK COMPONENTS ---

function MockCreditCardForm({ 
  amount, 
  frequency, 
  onSuccess 
}: {
  amount: number;
  frequency: string;
  fund: string;
  personalInfo: any;
  onSuccess: (paymentId: string) => void;
}) {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    // SIMULATION
    setTimeout(() => {
        setProcessing(false);
        onSuccess(`STRIPE-${Math.floor(Math.random() * 1000000)}`);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Card Details (Simulation)</Label>
        <div className="space-y-2">
            <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="0000 0000 0000 0000" className="pl-9" required maxLength={19} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" required maxLength={5} />
                <Input placeholder="CVC" required maxLength={3} />
            </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-6 text-lg" 
        size="lg"
        disabled={processing || amount <= 0}
      >
        {processing ? (
          <>Processing...</>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4"/> 
            Donate ${amount > 0 ? amount : 0}
            {frequency === 'monthly' && ' monthly'}
          </>
        )}
      </Button>
    </form>
  );
}

function MockPayPalButton({ 
  amount, 
  onSuccess 
}: {
  amount: number;
  onSuccess: (paymentId: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onSuccess(`PAYPAL-${Math.floor(Math.random() * 1000000)}`);
    }, 1500);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || amount <= 0}
      variant="outline"
      className="w-full py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
    >
        <Wallet className="mr-2 h-5 w-5" />
      {loading ? 'Redirecting...' : 'Pay with PayPal'}
    </Button>
  );
}

function MockFlutterwaveButton({ 
  amount, 
  onSuccess 
}: {
  amount: number;
  onSuccess: (paymentId: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onSuccess(`FLUTTER-${Math.floor(Math.random() * 1000000)}`);
    }, 1500);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || amount <= 0}
      variant="outline"
      className="w-full py-6 text-lg border-orange-500 text-orange-600 hover:bg-orange-50 bg-white"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {loading ? 'Connecting...' : 'Pay with Flutterwave'}
    </Button>
  );
}

// --- MAIN PAGE CONTENT ---

function GivePageContent() {
  // REPLACEMENT: Standard URL Params instead of next/navigation hook
  const [supportedEvent, setSupportedEvent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSupportedEvent(params.get('support'));
    }
  }, []);

  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('building-fund');
  const [customReason, setCustomReason] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (supportedEvent) {
      setSelectedFund('custom');
      setCustomReason(`Donation in support of: ${supportedEvent}`);
    }
  }, [supportedEvent]);

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(Number(value));
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // --- REALTIME DATABASE SAVING LOGIC ---
  const handlePaymentSuccess = async (id: string) => {
    try {
        setIsSaving(true);
        
        // 1. Create a reference to the 'donations' list
        const donationsRef = ref(db, 'donations');
        
        // 2. Generate a new key (push)
        const newDonationRef = push(donationsRef);
        
        // 3. Set the data
        await set(newDonationRef, {
            name: `${personalInfo.firstName} ${personalInfo.lastName}`,
            email: personalInfo.email,
            phone: personalInfo.phone,
            amount: amount,
            frequency: frequency,
            campaign: selectedFund,
            customReason: customReason || null,
            paymentMethod: paymentMethod,
            transactionId: id,
            date: serverTimestamp(),
            status: 'completed'
        });
        
        // Success!
        setPaymentSuccess(true);
        setPaymentId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (e: any) {
        console.error("Error adding document: ", e);
        alert(`Error saving donation: ${e.message || "Unknown error"}. Check your Realtime Database Rules.`);
    } finally {
        setIsSaving(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-lg border-green-200">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
            </div>
            <CardTitle className="text-2xl text-green-700">Thank You!</CardTitle>
            <CardDescription className="text-lg">
              Your donation of <strong>${amount}</strong> has been received.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Transaction Reference</p>
                <p className="font-mono text-sm">{paymentId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              A receipt has been sent to <strong>{personalInfo.email}</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="/">Return to Home</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Online Donation</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your generosity fuels our mission. Thank you for your faithful support.
        </p>
      </header>
      
      <main className="container mx-auto px-4 pb-16 flex justify-center">
        <Card className="w-full max-w-4xl shadow-xl">
          <CardHeader className="border-b bg-muted/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle className="text-2xl">Make a Donation</CardTitle>
                    <CardDescription>Secure online giving portal</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
              
              {/* Amount Section */}
              <div className="space-y-4">
                <Label htmlFor="amount" className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" /> Select Amount
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {suggestedAmounts.map(val => (
                    <Button
                      key={val}
                      variant="outline"
                      className={cn(
                        "py-6 text-lg transition-all hover:border-primary hover:bg-primary/5", 
                        amount === val && !customAmount && 'bg-primary text-primary-foreground border-primary ring-2 ring-offset-2 ring-primary/30'
                      )}
                      onClick={() => handleAmountClick(val)}
                    >
                      ${val}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter custom amount"
                    className="pl-8 py-6 text-lg"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Frequency Section */}
                  <div className='space-y-3'>
                    <Label className="text-base font-semibold">Frequency</Label>
                    <RadioGroup 
                        value={frequency} 
                        onValueChange={setFrequency}
                        className="flex gap-4"
                    >
                        <div className={cn(
                            "flex-1 flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors",
                            frequency === 'one-time' ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        )}>
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time" className="cursor-pointer flex-1">One Time</Label>
                        </div>
                        <div className={cn(
                            "flex-1 flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors",
                            frequency === 'monthly' ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        )}>
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly" className="cursor-pointer flex-1">Monthly</Label>
                        </div>
                    </RadioGroup>
                  </div>

                  {/* Fund Section */}
                  <div className='space-y-3'>
                    <Label htmlFor="fund" className="text-base font-semibold">Designation</Label>
                    <Select value={selectedFund} onValueChange={setSelectedFund}>
                        <SelectTrigger id="fund" className="h-auto py-3">
                            <SelectValue placeholder="Select a fund" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tithes">Tithes & Offerings</SelectItem>
                            <SelectItem value="missions">Missions</SelectItem>
                            <SelectItem value="building-fund">Building Fund</SelectItem>
                            <SelectItem value="custom">Other / Specific Cause</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    {selectedFund === 'custom' && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                        <Textarea 
                          placeholder="Please specify (e.g. Youth Camp, Disaster Relief)" 
                          className="resize-none mt-2"
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4 pt-4 border-t">
                <Label className="text-lg font-semibold">Your Details</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fname" className="text-xs text-muted-foreground">First Name</Label>
                        <Input 
                          id="fname"
                          value={personalInfo.firstName}
                          onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                          required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lname" className="text-xs text-muted-foreground">Last Name</Label>
                        <Input 
                          id="lname"
                          value={personalInfo.lastName}
                          onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                          required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs text-muted-foreground">Email Address</Label>
                        <Input 
                          id="email"
                          type="email" 
                          value={personalInfo.email}
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone (Optional)</Label>
                        <Input 
                          id="phone"
                          type="tel" 
                          value={personalInfo.phone}
                          onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        />
                    </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 pt-4 border-t">
                <Label className="text-lg font-semibold">Payment Method</Label>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
                    <Label 
                      htmlFor="stripe" 
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                        paymentMethod === 'stripe' && 'border-primary bg-primary/5 shadow-sm'
                      )}
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      <span className="font-medium">Credit Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                    <Label 
                      htmlFor="paypal" 
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                        paymentMethod === 'paypal' && 'border-blue-500 bg-blue-50/50 shadow-sm'
                      )}
                    >
                      <span className="mb-2 text-blue-600 font-bold text-xl">Pay</span>
                      <span className="font-medium">PayPal</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="flutterwave" id="flutterwave" className="sr-only" />
                    <Label 
                      htmlFor="flutterwave" 
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                        paymentMethod === 'flutterwave' && 'border-orange-500 bg-orange-50/50 shadow-sm'
                      )}
                    >
                      <span className="mb-2 text-orange-600 font-bold text-xl">FW</span>
                      <span className="font-medium">Flutterwave</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Dynamic Payment Details Area */}
              <div className="pt-4">
                {paymentMethod === 'stripe' && (
                    <MockCreditCardForm
                      amount={amount}
                      frequency={frequency}
                      fund={selectedFund}
                      personalInfo={personalInfo}
                      onSuccess={handlePaymentSuccess}
                    />
                )}
                
                {paymentMethod === 'paypal' && (
                  <MockPayPalButton
                    amount={amount}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
                
                {paymentMethod === 'flutterwave' && (
                  <MockFlutterwaveButton
                    amount={amount}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
              </div>
              
          </CardContent>
          <CardFooter className="flex-col gap-4 items-stretch bg-muted/20 rounded-b-xl border-t">
             <p className="text-xs text-muted-foreground text-center w-full flex items-center justify-center gap-2 py-2">
               <Shield className="h-4 w-4" />
               256-bit SSL Encryption • Tax Deductible • 501(c)(3) Nonprofit
             </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default function GivePage() {
  return (
    <Suspense fallback={<div>Loading donation form...</div>}>
      <GivePageContent />
    </Suspense>
  );
}