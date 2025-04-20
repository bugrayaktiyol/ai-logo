import { onCall } from "firebase-functions/v2/https";
import { CreateLogoRequest, GetLogoRequest } from "./model";
import { LogoService } from "./service";
import { LogoRepository } from "./repository";

// Initialize repository and service
const logoRepository = new LogoRepository();
const logoService = new LogoService(logoRepository);

export const getLogo = onCall({ region: "europe-west1" }, async (request) => {
  const data = request.data as GetLogoRequest;
  try {
    if (!data || typeof data.id !== "string") {
      throw new Error("Logo ID must be a string.");
    }

    const logo = await logoService.getLogo(data.id);
    return logo;
  } catch (error) {
    console.error("Error getting logo:", error);
    throw new Error(error instanceof Error ? error.message : "Error getting logo.");
  }
});

export const createLogo = onCall({ region: "europe-west1" }, async (request) => {
  const data = request.data as CreateLogoRequest;
  try {
    if (!data || !data.prompt || !data.style) {
      console.log("Eksik veri:", data);
      throw new Error("Eksik veri: prompt ve style alanları zorunludur.");
    }

    const logoId = await logoService.createLogo(data);
    return { id: logoId };
  } catch (error) {
    console.error("Logo creation error:", error);
    throw new Error(error instanceof Error ? error.message : "Logo creation failed.");
  }
});
