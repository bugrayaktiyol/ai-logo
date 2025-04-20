import { Request, Response } from 'express';
import { LogoService } from './service';
import { GenerateLogoRequest } from './models';

export class LogoController {
  private service: LogoService;

  constructor() {
    this.service = new LogoService();
  }

  async getLogoStyles(req: Request, res: Response): Promise<void> {
    try {
      const styles = await this.service.getLogoStyles();
      res.json(styles);
    } catch (error) {
      console.error('Error in getLogoStyles controller:', error);
      res.status(500).json({ error: 'Failed to fetch logo styles' });
    }
  }

  async generateLogo(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, styleType } = req.body as GenerateLogoRequest;

      if (!prompt || !styleType) {
        res.status(400).json({ error: 'Prompt and styleType are required' });
        return;
      }

      const logo = await this.service.generateLogo({ prompt, styleType });
      res.json(logo);
    } catch (error) {
      console.error('Error in generateLogo controller:', error);
      res.status(500).json({ error: 'Failed to generate logo' });
    }
  }

  async getLogoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'Logo ID is required' });
        return;
      }

      const logo = await this.service.getLogoById(id);
      
      if (!logo) {
        res.status(404).json({ error: 'Logo not found' });
        return;
      }

      res.json(logo);
    } catch (error) {
      console.error('Error in getLogoById controller:', error);
      res.status(500).json({ error: 'Failed to fetch logo' });
    }
  }
}
