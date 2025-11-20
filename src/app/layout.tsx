
'use client'
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from 'next/navigation';
import { SermonProvider } from '@/context/sermon-context';
import { EventProvider } from '@/context/event-context';
import { LiveStreamProvider } from '@/context/livestream-context';
import { MinistryProvider } from '@/context/ministry-context';

// Using a client component to conditionally render layout based on path
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SermonProvider>
          <EventProvider>
            <LiveStreamProvider>
                <MinistryProvider>
                  <div className="flex flex-col min-h-screen">
                    {!isAdminPage && <Header />}
                    <main className="flex-grow">{children}</main>
                    {!isAdminPage && <Footer />}
                  </div>
                  <Toaster />
                </MinistryProvider>
            </LiveStreamProvider>
          </EventProvider>
        </SermonProvider>
      </body>
    </html>
  );
}
