import React, { createContext, useContext, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (msg: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (msg: string, type: Notification['type']) => {
    setNotifications((prev) => [...prev, { id: Date.now().toString(), message: msg, type }]);
  };
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}; 