import * as admin from "firebase-admin";
import { Logo } from "./model";

/**
 * Repository class for handling logo data persistence
 */
export class LogoRepository {
  private db: FirebaseFirestore.Firestore;
  private logosCollection: FirebaseFirestore.CollectionReference;

  /**
   * Initializes the repository with Firestore connection
   */
  constructor() {
    this.db = admin.firestore();
    this.logosCollection = this.db.collection("logos");
  }

  /**
   * Retrieves a logo by ID
   * @param {string} id The logo ID
   * @return {Promise<Logo | null>} The logo or null if not found
   */
  async getLogo(id: string): Promise<Logo | null> {
    const logoDoc = await this.logosCollection.doc(id).get();
    if (!logoDoc.exists) {
      return null;
    }
    const logoData = logoDoc.data() as Omit<Logo, "id">;
    return {
      id: logoDoc.id,
      ...logoData,
    };
  }

  /**
   * Creates a new logo in the database
   * @param {Logo} logo The logo to create
   * @return {Promise<string>} The ID of the created logo
   */
  async createLogo(logo: Logo): Promise<string> {
    await this.logosCollection.doc(logo.id).set(logo);
    return logo.id;
  }

  /**
   * Updates the status of a logo
   * @param {string} id The logo ID
   * @param {string} status The new status
   */
  async updateLogoStatus(id: string, status: string): Promise<void> {
    await this.logosCollection.doc(id).update({
      status,
    });
  }
}
