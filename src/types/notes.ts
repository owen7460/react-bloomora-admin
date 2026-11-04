export interface Note {
  id: number;
  title: string;
  author_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GetNotesResponse {
  code: number;
  message: string;
  data: Note[];
}
