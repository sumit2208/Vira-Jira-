'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ avoid SSR class instance error

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}