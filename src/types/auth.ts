export interface LoginRequest{
  email: string;
  password: string;
}

export interface TokenResponse{
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest{
  email: string;
  password: string;
}

export interface RegisterResponse{
  id: string;
  email: string;
}