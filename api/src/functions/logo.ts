import * as functions from 'firebase-functions';
import { LogoService } from '../internal/features/service';
import { GenerateLogoRequest } from '../internal/features/models';

const logoService = new LogoService();

export const getLogoStyles = functions.https.onCall(async (request, _) => {
  try {
    const styles = await logoService.getLogoStyles();
    return styles;
  } catch (error) {
    console.error('Error in getLogoStyles function:', error);
    throw new functions.https.HttpsError('internal', 'Failed to fetch logo styles');
  }
});

export const generateLogo = functions.https.onCall(async (request, _) => {
  try {
    const data = request.data as GenerateLogoRequest;
    
    if (!data.prompt || !data.styleType) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Prompt and styleType are required'
      );
    }

    const logo = await logoService.generateLogo(data);
    return logo;
  } catch (error) {
    console.error('Error in generateLogo function:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate logo');
  }
});

export const getLogoById = functions.https.onCall(async (request, _) => {
  try {
    const data = request.data as { id: string };
    
    if (!data.id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Logo ID is required'
      );
    }

    const logo = await logoService.getLogoById(data.id);
    
    if (!logo) {
      throw new functions.https.HttpsError(
        'not-found',
        'Logo not found'
      );
    }

    return logo;
  } catch (error) {
    console.error('Error in getLogoById function:', error);
    throw new functions.https.HttpsError('internal', 'Failed to fetch logo');
  }
}); 