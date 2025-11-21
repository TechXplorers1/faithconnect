'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, HandHeart } from 'lucide-react';
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
  { href: '/connect', label: 'Connect' },
  { href: '/contact', label: 'Contact' },
  { href: '/visit', label: 'Visit' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    // Reverted back to h-16 (standard height)
    <header className="w-full border-b bg-background sticky top-0 z-40">
      <div className="container flex h-16 items-center">
        
        {/* Logo scale increased to 110% */}
        <div className="mr-8 hidden md:flex transform scale-110 origin-left">
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
                 <div className="transform scale-110 origin-left">
                    <Logo />
                 </div>
              </div>
              <nav className="mt-4 flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      // Increased to text-lg for mobile
                      'text-lg font-medium transition-colors hover:text-primary p-2 rounded-md',
                      pathname === link.href ? 'text-accent-foreground bg-accent' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button asChild className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none text-base h-11">
                   <Link href="/give" onClick={() => setIsMobileMenuOpen(false)}>
                     <HandHeart className="mr-2 h-5 w-5" /> Donate
                   </Link>
                 </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-start">
            <div className="md:hidden transform scale-110">
                <Logo />
            </div>
            <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className={cn(
                    // Increased to text-base (was text-sm)
                    'text-base font-medium transition-colors hover:bg-accent/80 hover:text-accent-foreground px-3 py-2 rounded-lg',
                    pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                )}
                >
                {link.label}
                </Link>
            ))}
            </nav>
        </div>

        <div className="flex items-center justify-end gap-2">
             {/* Increased text size to text-base and icon size */}
             <Button asChild className="hidden md:flex bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm text-base px-5">
                <Link href="/give">
                   <HandHeart className="mr-2 h-5 w-5" /> Donate
                </Link>
             </Button>

             {/* Increased text size to text-base */}
             <Button asChild variant="outline" className="text-base px-5">
                <Link href="/login">Login</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}