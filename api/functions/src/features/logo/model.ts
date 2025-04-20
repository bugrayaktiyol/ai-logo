export interface Logo {
  id: string;
  createdAt: FirebaseFirestore.Timestamp;
  imageUrl: string;
  prompt: string;
  status: string;
  style: string;
}

export interface CreateLogoRequest {
  prompt: string;
  style: string;
}

export interface GetLogoRequest {
  id: string;
}

export interface CreateLogoResponse {
  id: string;
}
