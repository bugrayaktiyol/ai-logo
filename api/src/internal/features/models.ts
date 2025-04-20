export interface LogoStyle {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

export interface GenerateLogoRequest {
  prompt: string;
  styleType: string;
}

export interface GenerateLogoResponse {
  id: string;
  url: string;
  prompt: string;
  styleType: string;
  createdAt: string;
}
