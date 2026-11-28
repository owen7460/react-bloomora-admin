import { getAnnouncements } from "@/apis/announcements";
import type { Announcement } from "@/types/announcements";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnnouncementCard({
  className,
}: {
  className?: string;
}) {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAnnouncement = async () => {
      try {
        const res = await getAnnouncements();
        if (!cancelled) {
          setAnnouncements(res.data.filter((item) => item.is_pinned) ?? null);
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
    <div
      className={cn(
        "bg-white/25 backdrop-blur-sm border border-white/30 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105",
        className,
      )}
    >
      <h2 className="text-primary text-xl font-bold pb-2">Announcement 📣</h2>
      {isLoading && (
        <p className="text-sm text-white">Loading announcement...</p>
      )}
      {!isLoading && error && (
        <p role="alert" className="text-sm text-white">
          {error}
        </p>
      )}
      {!isLoading && !error && !announcements && (
        <p className="text-sm text-white">No announcements at the moment.</p>
      )}
      {!isLoading && !error && announcements && (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id}>
              <p className="font-bold">{announcement.title}</p>
              <p className="text-sm text-zinc-600">
                {new Date(announcement.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-black whitespace-pre-line">
                {announcement.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
