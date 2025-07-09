'use client'

import { Provider } from '@/components/ui/provider'; 
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode,
  session: Session | null
}

export function Providers({
  children,
  session
}: Props) {

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Provider>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          {children}
          <Toaster />
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  )
}