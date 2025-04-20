import { db } from '../../config/firebase';
import { GenerateLogoRequest, GenerateLogoResponse, LogoStyle } from './models';

export class LogoRepository {
  private readonly logosCollection = 'logos';
  private readonly stylesCollection = 'logoStyles';

  async getLogoStyles(): Promise<LogoStyle[]> {
    try {
      const snapshot = await db.collection(this.stylesCollection).get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as LogoStyle));
    } catch (error) {
      console.error('Error fetching logo styles:', error);
      throw error;
    }
  }

  async saveGeneratedLogo(logo: GenerateLogoResponse): Promise<string> {
    try {
      const docRef = await db.collection(this.logosCollection).add(logo);
      return docRef.id;
    } catch (error) {
      console.error('Error saving generated logo:', error);
      throw error;
    }
  }

  async getLogoById(id: string): Promise<GenerateLogoResponse | null> {
    try {
      const doc = await db.collection(this.logosCollection).doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return {
        id: doc.id,
        ...doc.data()
      } as GenerateLogoResponse;
    } catch (error) {
      console.error(`Error fetching logo with id ${id}:`, error);
      throw error;
    }
  }
}
