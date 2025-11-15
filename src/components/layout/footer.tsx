import Link from 'next/link';
import { Logo } from '@/components/logo';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Button } from '../ui/button';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

const footerLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Sermons', href: '/sermons' },
    { title: 'Events', href: '/events' },
    { title: 'Give', href: '/give' },
    { title: 'Contact', href: '/contact' },
    { title: 'Live Stream', href: '/live' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Connecting our community through faith, fellowship, and service.
            </p>
             <div className="mt-6">
                <h3 className="font-semibold text-foreground">Stay Connected</h3>
                <p className="text-muted-foreground text-sm mt-2 mb-4">Sign up for our weekly newsletter.</p>
                <NewsletterSignup />
            </div>
          </div>

          <div>
             <h3 className="font-semibold text-foreground">Quick Links</h3>
             <ul className="mt-4 space-y-2">
                {footerLinks.map(link => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {link.title}
                        </Link>
                    </li>
                ))}
             </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <address className="mt-4 not-italic text-muted-foreground space-y-2">
              <p>123 Faith Ave<br/>Community City, 12345</p>
              <p>
                <a href="tel:123-456-7890" className="hover:text-primary">(123) 456-7890</a>
              </p>
              <p>
                <a href="mailto:hello@faithconnect.com" className="hover:text-primary">hello@faithconnect.com</a>
              </p>
            </address>
          </div>

          <div>
             <h3 className="font-semibold text-foreground">Follow Us</h3>
             <div className="flex mt-4 space-x-4">
                {socialLinks.map((social) => (
                    <Button key={social.name} variant="ghost" size="icon" asChild>
                        <a href={social.href} aria-label={social.name}>
                            <social.icon className="h-5 w-5" />
                        </a>
                    </Button>
                ))}
             </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FaithConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
