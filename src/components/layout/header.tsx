
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, HandHeart } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/live', label: 'Live' },
  { href: '/contact', label: 'Contact' },
  { href: '/visit', label: 'Visit' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-background sticky top-0 z-40">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background p-0">
              <div className="p-4 border-b">
                 <Logo />
              </div>
              <nav className="mt-4 flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary p-2 rounded-md',
                      pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button asChild className="mt-4">
                   <Link href="/give" onClick={() => setIsMobileMenuOpen(false)}>
                     <HandHeart className="mr-2" /> Donate
                   </Link>
                 </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between md:justify-start">
            <div className="md:hidden">
                <Logo />
            </div>
            <nav className="hidden md:flex gap-6 ml-6">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                )}
                >
                {link.label}
                </Link>
            ))}
            </nav>
        </div>


        <div className="flex items-center justify-end gap-2">
            <Button asChild>
                <Link href="/give"><HandHeart className="mr-2 h-4 w-4" /> Donate</Link>
            </Button>
             <Button asChild variant="outline">
                <Link href="/login">Login</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
