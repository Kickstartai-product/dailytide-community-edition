'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={60 * 5} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}
