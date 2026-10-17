import { getAnnouncements } from "@/apis/announcements";
import type { Announcement } from "@/types/announcements";
import { useEffect, useState } from "react";

export default function AnnouncementCard() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAnnouncement = async () => {
      try {
        const res = await getAnnouncements();
        if (!cancelled) {
          // The API sorts pinned announcements first, then newest first.
          setAnnouncement(res.data.find((item) => item.is_published) ?? null);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load the announcement. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadAnnouncement();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-75 bg-gray-100 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105">
      <h2 className="text-primary text-xl font-bold pb-2">Announcement 📣</h2>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading announcement...</p>
      ) : error ? (
        <p role="alert" className="text-sm text-gray-500">
          {error}
        </p>
      ) : announcement ? (
        <div>
          <h3 className="text-base pb-2">{announcement.title}</h3>
          <p className="text-sm text-gray-500 whitespace-pre-line">
            {announcement.content}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No announcements at the moment.</p>
      )}
    </div>
  );
}
