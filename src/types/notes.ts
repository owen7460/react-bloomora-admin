export interface Note {
  id: number;
  title: string;
  author_id: number;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetNotesResponse {
  code: number;
  message: string;
  data: Note[];
}
