import { GenerateLogoRequest, GenerateLogoResponse, LogoStyle } from './models';
import { LogoRepository } from './repository';

export class LogoService {
  private repository: LogoRepository;

  constructor() {
    this.repository = new LogoRepository();
  }

  async getLogoStyles(): Promise<LogoStyle[]> {
    return this.repository.getLogoStyles();
  }

  async generateLogo(request: GenerateLogoRequest): Promise<GenerateLogoResponse> {
    const staticImages: Record<string, string> = {
      'minimal': 'https://example.com/static/minimal-logo.png',
      'modern': 'https://example.com/static/modern-logo.png',
      'vintage': 'https://example.com/static/vintage-logo.png',
      'playful': 'https://example.com/static/playful-logo.png',
      'professional': 'https://example.com/static/professional-logo.png',
    };

    const imageUrl = staticImages[request.styleType] || 'https://example.com/static/default-logo.png';

    const logo: GenerateLogoResponse = {
      id: '', // Will be set
      url: imageUrl,
      prompt: request.prompt,
      styleType: request.styleType,
      createdAt: new Date().toISOString()
    };

    // Save to Firestore and get the ID
    const id = await this.repository.saveGeneratedLogo(logo);
    logo.id = id;

    return logo;
  }

  async getLogoById(id: string): Promise<GenerateLogoResponse | null> {
    return this.repository.getLogoById(id);
  }
}
