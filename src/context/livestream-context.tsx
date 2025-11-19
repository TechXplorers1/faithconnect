'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LiveStreamContextType {
  liveStreamUrl: string | null;
  isLive: boolean;
  setLiveStreamUrl: (url: string | null) => void;
  setIsLive: (isLive: boolean) => void;
}

const LiveStreamContext = createContext<LiveStreamContextType | undefined>(undefined);

export function LiveStreamProvider({ children }: { children: ReactNode }) {
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [isLive, setIsLive] = useState<boolean>(false);

  return (
    <LiveStreamContext.Provider value={{ liveStreamUrl, setLiveStreamUrl, isLive, setIsLive }}>
      {children}
    </LiveStreamContext.Provider>
  );
}

export function useLiveStream() {
  const context = useContext(LiveStreamContext);
  if (context === undefined) {
    throw new Error('useLiveStream must be used within a LiveStreamProvider');
  }
  return context;
}
