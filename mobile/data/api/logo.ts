import { getFunctions, httpsCallable } from 'firebase/functions';

export const createLogo = async (functions: any, params: Logo.CreateParams): Promise<{ id: string } | null> => {
  try {
    const createLogoFunction = httpsCallable(functions, 'createLogo');
    const result = await createLogoFunction(params);
    return result.data as { id: string };
  } catch (err) {
    console.error('Logo creation error:', err);
    return null;
  }
};

export const getLogo = async (functions: any, id: string): Promise<Logo.LogoData | null> => {
  try {
    const getLogoFunction = httpsCallable(functions, 'getLogo');
    const result = await getLogoFunction({ id });
    return result.data as Logo.LogoData;
  } catch (err) {
    console.error('Logo get error:', err);
    return null;
  }
};