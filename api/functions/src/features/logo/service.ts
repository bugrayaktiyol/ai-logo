import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { Logo, CreateLogoRequest } from "./model";
import { LogoRepository } from "./repository";

/**
 * Service class for logo business logic
 */
export class LogoService {
  private repository: LogoRepository;

  /**
   * Initializes the service with a repository
   * @param {LogoRepository} repository The logo repository
   */
  constructor(repository: LogoRepository) {
    this.repository = repository;
  }

  /**
   * Gets a logo by its ID
   * @param {string} id The logo ID
   * @return {Promise<Logo>} The logo if found
   * @throws Error if logo not found
   */
  async getLogo(id: string): Promise<Logo> {
    const logo = await this.repository.getLogo(id);
    if (!logo) {
      throw new Error("Logo not found.");
    }
    return logo;
  }

  /**
   * Creates a new logo
   * @param {CreateLogoRequest} data The logo creation request
   * @return {Promise<string>} The ID of the created logo
   * @throws Error if required fields are missing
   */
  async createLogo(data: CreateLogoRequest): Promise<string> {
    if (!data.prompt || !data.style) {
      throw new Error("Missing data: prompt and style fields are required.");
    }

    // Error simulation
    if (data.prompt.toLowerCase() === "error") {
      throw new Error("Test purpose error thrown");
    }

    // Create a unique ID for the logo
    const logoId = uuidv4();
    // Generate a random image URL from Picsum
    const imageUrl = `https://picsum.photos/seed/${logoId}/400/400`;

    // Create new logo with pending status
    const newLogo: Logo = {
      id: logoId,
      createdAt: admin.firestore.Timestamp.now(),
      imageUrl,
      prompt: data.prompt,
      status: "pending",
      style: data.style,
    };

    await this.repository.createLogo(newLogo);

    // Simulating asynchronous logo generation
    this.simulateLogoGeneration(logoId);

    return logoId;
  }

  /**
   * Simulates asynchronous logo generation process
   * @param {string} logoId The ID of the logo to update
   */
  private simulateLogoGeneration(logoId: string): void {
    // Random timeout for simulating the logo creation process
    const delay = Math.floor(Math.random() * (10000 - 5000 + 1) + 5000);
    setTimeout(async () => {
      try {
        await this.repository.updateLogoStatus(logoId, "completed");
      } catch (error) {
        console.error("Error updating logo:", error);
      }
    }, delay);
  }
}
