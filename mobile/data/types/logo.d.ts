declare namespace Logo {
  interface CreateParams {
    prompt: string;
    style: string;
  }

  interface LogoData {
    id: string;
    imageUrl: string;
    prompt: string;
    style: string;
    status: 'pending' | 'completed' | 'failed';
  }

  interface LogoState {
    logos: Record<string, LogoData>;
    currentLogoId: string | null;
    loading: boolean;
    error: string | null;
  }
}
