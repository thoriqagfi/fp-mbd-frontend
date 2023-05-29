import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Toast from '@/components/Toast/Toast'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
