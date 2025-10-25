import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { SocketProvider } from './SocketProvider';
import { store } from '@/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <SocketProvider>{children}</SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default AppProviders; 