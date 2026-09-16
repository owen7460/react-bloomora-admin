import http from "./client";
import type { LoginRequest, TokenResponse, RegisterRequest, RegisterResponse } from "@/types/auth";

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  const res = await http.post<TokenResponse>("/auth/login", payload);
  return res.data;
};

export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const res = await http.post<RegisterResponse>("/auth/register", payload);
  return res.data;
};