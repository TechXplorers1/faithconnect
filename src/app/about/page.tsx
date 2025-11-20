
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const leadership = [
  { name: 'Pastor John Doe', title: 'Senior Pastor', avatar: 'JD' },
  { name: 'Pastor Jane Smith', title: 'Associate Pastor', avatar: 'JS' },
  { name: 'Alex Chen', title: 'Worship Leader', avatar: 'AC' },
  { name: 'Maria Garcia', title: 'Children\'s Ministry Director', avatar: 'MG' },
];

const coreValues = [
    {
        title: 'Gospel-Centered',
        description: 'The good news of Jesus is the foundation of everything we do.',
    },
    {
        title: 'Authentic Community',
        description: 'We are committed to being a church family that is real and relational.',
    },
    {
        title: 'Sacrificial Service',
        description: 'We joyfully give of our time, talents, and resources to serve God and others.',
    },
    {
        title: 'Missional Living',
        description: 'We are called to share the love of Christ in our neighborhoods and to the nations.',
    }
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">About FaithConnect</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn about our story, our beliefs, and the people who lead our community.
        </p>
      </header>

   {aboutImage && (
        <section className="container mx-auto px-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/about.png"
              alt={aboutImage.description}
              fill
              className="object-fill"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              FaithConnect began in a small living room in 2005 with a handful of families passionate about creating a church that felt like home. Their vision was simple: to build a community rooted in authentic faith, genuine relationships, and a heart for service. Over the years, we've grown, moved into our own building, and launched ministries that have impacted hundreds of lives, but our core mission has remained the same.
            </p>
            <p className="mt-4 text-muted-foreground">
              We are a diverse family of believers, united by our love for God and our desire to share His love with our city and the world. We believe in being a church not just with walls, but one that actively engages with and blesses the community around us.
            </p>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To connect people to God, to each other, and to their purpose in Christ.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To be a beacon of hope and a center for transformation in our community, raising up disciples who make a difference wherever they go.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {coreValues.map(value => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {leadership.map(leader => (
              <div key={leader.name} className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${leader.avatar}`} />
                  <AvatarFallback>{leader.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{leader.name}</h3>
                <p className="text-sm text-muted-foreground">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
