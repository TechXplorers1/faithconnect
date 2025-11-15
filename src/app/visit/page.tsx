import { MapPin, Clock, Users, Coffee, ParkingCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function VisitPage() {
  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Plan Your Visit</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We can't wait to meet you! Here's everything you need to know for your first visit to FaithConnect.
        </p>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="text-primary" /> Service Times</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">Sunday Worship Service</p>
              <p className="text-lg">10:00 AM - 11:30 AM</p>
              <p className="mt-2 text-muted-foreground">Join us for a time of worship, an engaging message, and community connection.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="text-primary" /> Location & Directions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">123 Faith Ave, Community City, 12345</p>
              <div className="mt-4 aspect-video bg-muted rounded-lg flex items-center justify-center">
                 <p className="text-muted-foreground">[Map Placeholder]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">What to Expect</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><Users className="text-primary h-6 w-6" /></div>
              <div>
                <h3 className="text-xl font-semibold">A Welcoming Atmosphere</h3>
                <p className="text-muted-foreground mt-1">From the moment you walk in, you'll be greeted with a warm smile. We're a friendly community and we're excited to have you join us.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><Coffee className="text-primary h-6 w-6" /></div>
              <div>
                <h3 className="text-xl font-semibold">Coffee's On Us</h3>
                <p className="text-muted-foreground mt-1">Arrive a little early and grab a complimentary cup of coffee or tea in our lobby. It's a great chance to meet someone new.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><ParkingCircle className="text-primary h-6 w-6" /></div>
              <div>
                <h3 className="text-xl font-semibold">Convenient Parking</h3>
                <p className="text-muted-foreground mt-1">We have a large parking lot with plenty of space. Our parking team will help you find a spot quickly and easily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>What should I wear?</AccordionTrigger>
            <AccordionContent>
              We have a "come as you are" atmosphere. You'll see everything from jeans and t-shirts to suits and dresses. Wear whatever makes you feel comfortable!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What about my kids?</AccordionTrigger>
            <AccordionContent>
              We have an exciting and secure children's ministry called KidsConnect for children from nursery through 5th grade. Our trained volunteers will ensure your kids have a fun, safe, and engaging experience while you enjoy the service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How long is the service?</AccordionTrigger>
            <AccordionContent>
              Our services typically last about 90 minutes. They include live music from our worship band and a relevant, engaging message from one of our pastors.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger>Am I expected to give money?</AccordionTrigger>
            <AccordionContent>
              As a guest, please do not feel any obligation to give. The service is our gift to you. We believe giving is an act of worship for those who call FaithConnect their home church.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
