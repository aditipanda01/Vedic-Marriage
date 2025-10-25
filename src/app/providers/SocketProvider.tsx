import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { socketManager } from '@/services/websocket/socketManager';

interface SocketContextType {
  isConnected: boolean;
  sendMessage: (event: string, data: unknown) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { user } = useAuth();
  const isConnected = useRef(false);

  useEffect(() => {
    if (!user) {
      socketManager.disconnect();
      isConnected.current = false;
      return;
    }

    const connect = async () => {
      try {
        await socketManager.connect(user.id);
        isConnected.current = true;
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        isConnected.current = false;
      }
    };

    connect();

    return () => {
      socketManager.disconnect();
      isConnected.current = false;
    };
  }, [user]);

  const sendMessage = (event: string, data: unknown) => {
    if (!isConnected.current) {
      console.warn('Socket is not connected');
      return;
    }
    socketManager.emit(event, data);
  };

  const value = {
    isConnected: isConnected.current,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
} 