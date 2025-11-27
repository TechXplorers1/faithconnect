// app/connect/page.jsx
import { Suspense } from 'react';
import ConnectClient from './ConnectClient';

export default function Page() {
  return (
    <main>
      <Suspense fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading…</p>
        </div>
      }>
        <ConnectClient />
      </Suspense>
    </main>
  );
}
