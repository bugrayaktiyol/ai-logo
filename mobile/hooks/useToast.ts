import { useState } from 'react';
import { ToastType } from '@components/common/Toast';

export interface ToastState {
  type: ToastType;
  message: string;
  subMessage?: string;
  logoId?: string;
  imageUrl?: string;
}

export function useToast() {
  const [toastState, setToastState] = useState<ToastState>({
    type: undefined,
    message: '',
  });

  const showToast = (state: ToastState) => {
    setToastState({ ...state });
  };

  const hideToast = () => {
    setToastState({ ...toastState, type: undefined });
  };

  return {
    toastState,
    showToast,
    hideToast
  };
} 