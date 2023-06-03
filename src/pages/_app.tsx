import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider, QueryClient, QueryOptions } from '@tanstack/react-query'
import Toast from '@/components/Toast/Toast'
import { apiMock } from '@/lib/apiMock'

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const res = await apiMock(`${queryKey?.[0]}`)
  return res.data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

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
