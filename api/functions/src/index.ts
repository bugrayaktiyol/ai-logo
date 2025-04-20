import * as admin from "firebase-admin";
import { createLogo, getLogo } from "./features/logo/controller";

admin.initializeApp();

// Export Firebase Cloud Functions
export { createLogo, getLogo };
