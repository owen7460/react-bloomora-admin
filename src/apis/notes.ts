import http from "@/apis/client";
import type { GetNotesResponse } from "@/types/notes";

export const getNotes = async (): Promise<GetNotesResponse> => {
  const res = await http.get<GetNotesResponse>(`/notes`);
  return res.data;
};
