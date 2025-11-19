import { Church } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="FaithConnect Home">
      <Church className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight font-headline text-foreground">
        FaithConnect
      </span>
    </Link>
  );
}
