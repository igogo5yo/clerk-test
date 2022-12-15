import '../styles/globals.css'
import styles from '../styles/layout.module.css'
import type { AppProps } from 'next/app'
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.layout}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
