export interface ClerkUserData {
  id: string;
  email?: string;
  name?: string | null;
  image?: string;
}

export interface BackendUser {
  _id: string;
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}