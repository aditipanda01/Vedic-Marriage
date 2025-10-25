import React, { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Styled Components
const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const ToastItem = styled.div<{ type: ToastType; isVisible: boolean }>`
  background: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors?.success?.light || '#d4edda';
      case 'error':
        return theme.colors?.error?.light || '#f8d7da';
      case 'warning':
        return theme.colors?.warning?.light || '#fff3cd';
      case 'info':
        return '#d1ecf1';
      default:
        return '#ffffff';
    }
  }};
  border: 1px solid ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors?.success?.main || '#c3e6cb';
      case 'error':
        return theme.colors?.error?.main || '#f5c6cb';
      case 'warning':
        return theme.colors?.warning?.main || '#ffeaa7';
      case 'info':
        return '#bee5eb';
      default:
        return '#dee2e6';
    }
  }};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.3s ease-in-out;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
`;

const ToastIcon = styled.div<{ type: ToastType }>`
  color: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors?.success?.main || '#28a745';
      case 'error':
        return theme.colors?.error?.main || '#dc3545';
      case 'warning':
        return theme.colors?.warning?.main || '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  }};
  flex-shrink: 0;
  margin-top: 2px;
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

const ToastCloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
  flex-shrink: 0;
  margin-top: 2px;

  &:hover {
    color: #666;
    background: rgba(0, 0, 0, 0.05);
  }
`;

// Toast Component
const ToastItemComponent: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(toast.id), 300);
  };

  return (
    <ToastItem type={toast.type} isVisible={isVisible}>
      <ToastIcon type={toast.type}>
        {getIcon()}
      </ToastIcon>
      <ToastContent>
        <ToastTitle>{toast.title}</ToastTitle>
        {toast.message && <ToastMessage>{toast.message}</ToastMessage>}
      </ToastContent>
      <ToastCloseButton onClick={handleClose}>
        <X size={16} />
      </ToastCloseButton>
    </ToastItem>
  );
};

// Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, clearAllToasts }}>
      {children}
      <ToastContainerWrapper>
        {toasts.map(toast => (
          <ToastItemComponent key={toast.id} toast={toast} onClose={hideToast} />
        ))}
      </ToastContainerWrapper>
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 