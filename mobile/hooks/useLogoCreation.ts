import { useState, useEffect } from 'react';
import { ToastState } from './useToast';
import { useLogoStore } from '../data/stores/logo';

export function useLogoCreation(showToast: (state: ToastState) => void) {
  const [createdLogoId, setCreatedLogoId] = useState<string | null>(null);
  const { createLogo, getLogo, setCompletedLogo } = useLogoStore();

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const checkLogoStatus = async () => {
      if (!createdLogoId) return;

      try {
        const logo = await getLogo(createdLogoId);
        
        if (logo?.status === 'completed') {
          showToast({
            type: 'success',
            message: 'Your Design is Ready!',
            subMessage: 'Tap to see it.',
            logoId: createdLogoId,
            imageUrl: logo.imageUrl,
          });
          clearInterval(pollInterval);
          setCreatedLogoId(null);
          setCompletedLogo(logo);
        } else if (logo?.status === 'failed') {
          showToast({
            type: 'error',
            message: 'Logo creation failed',
            subMessage: 'Click to try again.',
          });
          clearInterval(pollInterval);
          setCreatedLogoId(null);
        }
      } catch (err) {
        console.error('Logo status check error:', err);
      }
    };

    if (createdLogoId) {
      // Check every 2 seconds
      pollInterval = setInterval(checkLogoStatus, 2000);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [createdLogoId, getLogo]);

  const handleCreateLogo = async (prompt: string, styleId: string) => {
    if (!prompt) {
      showToast({
        type: 'error',
        message: 'Please enter a description',
      });
      return false;
    }

    // Error simulation
    if (prompt.toLowerCase() === "error") {
      showToast({
        type: 'error',
        message: 'Oops, something went wrong!',
        subMessage: 'Click to try again.',
      });
      return false;
    }

    showToast({
      type: 'loading',
      message: 'Creating Your Design...',
      subMessage: 'Ready in 2 minutes',
    });

    try {
      const logoId = await createLogo({
        prompt,
        style: styleId
      });

      if (logoId) {
        setCreatedLogoId(logoId);
        return true;
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Oops, something went wrong!',
        subMessage: 'Click to try again.',
      });
    }
    
    return false;
  };

  return {
    createdLogoId,
    handleCreateLogo
  };
} 