export interface Announcement {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  is_pinned: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface GetAnnouncementsResponse {
  code: number;
  message: string;
  data: Announcement[];
}

export interface GetAnnouncementResponse {
  code: number;
  message: string;
  data: Announcement;
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  is_published?: boolean;
  is_pinned?: boolean;
}

export interface CreateAnnouncementResponse {
  code: number;
  message: string;
  data: Announcement;
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  is_published?: boolean;
  is_pinned?: boolean;
}

export interface UpdateAnnouncementResponse {
  code: number;
  message: string;
  data: Announcement;
}

export interface DeleteAnnouncementResponse {
  code: number;
  message: string;
  data: Announcement;
}
