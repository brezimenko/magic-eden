'use client'
import type { ReactNode } from 'react'
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";

export default function ReactQuery({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
