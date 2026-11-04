import { useEffect, useState } from "react";
import { getNotes } from "@/apis/notes";
import type { Note } from "@/types/notes";
import { ShimmerMarker } from "@/components/Shimmer";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadNotes() {
      setLoading(true);
      setError(null);
      setNotes([]);

      try {
        const res = await getNotes();
        if (res.code !== 200) {
          throw new Error(`fetch notes failed: ${res.message}`);
        }
        if (!ignore) {
          setNotes(res.data);
        }
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadNotes();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <ShimmerMarker />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full">
      <div className="p-8 space-y-4">
        <h1 className=" text-left text-4xl font-bold text-primary">
          All Notes
        </h1>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-wrap gap-6 p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="w-87.5 h-100 p-8 space-y-4 bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg rounded-lg"
          >
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p className="text-sm text-gray-600">
              {note.author_id} - {new Date(note.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
