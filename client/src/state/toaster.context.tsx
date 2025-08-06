import React, { createContext, useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToasterContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
  toasts: Toast[];
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

// Styled Components
const ToasterContainer = styled(Box)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
`;

const ToastItem = styled(Box)<{ type: ToastType }>`
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      case 'error':
        return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
      case 'warning':
        return 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
      case 'info':
        return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
      default:
        return 'linear-gradient(135deg, #4b0082 0%, #6a0dad 100%)';
    }
  }};
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid ${({ type }) => {
    switch (type) {
      case 'success':
        return '#2E7D32';
      case 'error':
        return '#C62828';
      case 'warning':
        return '#EF6C00';
      case 'info':
        return '#1565C0';
      default:
        return '#ffd700';
    }
  }};
  transform: translateX(100%);
  animation: slideIn 0.3s ease-out forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  &.exiting {
    animation: slideOut 0.3s ease-in forwards;
  }
`;

const ToastIcon = styled(Box)`
  display: inline-block;
  margin-right: 8px;
  font-size: 1.2rem;
`;

export const ToasterProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info', duration: number = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <ToasterContext.Provider value={{ showToast, hideToast, toasts }}>
      {children}
      <ToasterContainer>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            type={toast.type}
            onClick={() => hideToast(toast.id)}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ToastIcon>{getToastIcon(toast.type)}</ToastIcon>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {toast.message}
              </Typography>
            </Box>
          </ToastItem>
        ))}
      </ToasterContainer>
    </ToasterContext.Provider>
  );
};

export const useToaster = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
}; 