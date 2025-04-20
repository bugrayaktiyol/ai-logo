import { create } from 'zustand';
import { createLogo as apiCreateLogo, getLogo as apiGetLogo } from '../api/logo';
import { getFunctions } from 'firebase/functions';
import { initializeApp } from 'firebase/app';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase init
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'europe-west1');

interface LogoStore {
  currentLogoId: string | null;
  loading: boolean;
  error: string | null;
  completedLogo: Logo.LogoData | null;
  createLogo: (params: Logo.CreateParams) => Promise<string | null>;
  getLogo: (id: string) => Promise<Logo.LogoData | null>;
  setCurrentLogo: (id: string | null) => void;
  setCompletedLogo: (logo: Logo.LogoData) => void;
}

export const useLogoStore = create<LogoStore>((set) => {
  return {
    currentLogoId: null,
    loading: false,
    error: null,
    completedLogo: null,
    createLogo: async (params: Logo.CreateParams) => {
      set({ loading: true, error: null });
      try {
        const result = await apiCreateLogo(functions, params);
        set({ loading: false });
        if (result?.id) {
          return result.id;
        }
        return null;
      } catch (err) {
        set({ loading: false, error: 'Logo oluşturma başarısız' });
        return null;
      }
    },
    getLogo: async (id: string) => {
      try {
        return await apiGetLogo(functions, id);
      } catch (err) {
        console.error('Logo alma hatası:', err);
        return null;
      }
    },
    setCurrentLogo: (id: string | null) => set({ currentLogoId: id }),
    setCompletedLogo: (logo: Logo.LogoData) => set({ completedLogo: logo })
  };
});