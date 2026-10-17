import http from "@/apis/client";
import type {
  GetAnnouncementsResponse,
  GetAnnouncementResponse,
  CreateAnnouncementPayload,
  CreateAnnouncementResponse,
  UpdateAnnouncementPayload,
  UpdateAnnouncementResponse,
  DeleteAnnouncementResponse,
} from "@/types/announcements";

const getAnnouncements = async (): Promise<GetAnnouncementsResponse> => {
  const res = await http.get<GetAnnouncementsResponse>("/announcements");
  return res.data;
};

const getAnnouncement = async (
  id: number,
): Promise<GetAnnouncementResponse> => {
  const res = await http.get<GetAnnouncementResponse>(`/announcements/${id}`);
  return res.data;
};

const createAnnouncement = async (
  payload: CreateAnnouncementPayload,
): Promise<CreateAnnouncementResponse> => {
  const res = await http.post<CreateAnnouncementResponse>(
    "/announcements",
    payload,
  );
  return res.data;
};

const updateAnnouncement = async (
  id: number,
  payload: UpdateAnnouncementPayload,
): Promise<UpdateAnnouncementResponse> => {
  const res = await http.put<UpdateAnnouncementResponse>(
    `/announcements/${id}`,
    payload,
  );
  return res.data;
};

const deleteAnnouncement = async (
  id: number,
): Promise<DeleteAnnouncementResponse> => {
  const res = await http.delete<DeleteAnnouncementResponse>(
    `/announcements/${id}`,
  );
  return res.data;
};

export {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
