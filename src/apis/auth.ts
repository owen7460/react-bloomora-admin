import http from "./client";
import type { LoginRequest, TokenResponse } from "@/types/auth";

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  const res = await http.post<TokenResponse>("/auth/login", payload);
  return res.data;
};