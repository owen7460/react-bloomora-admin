import { useEffect, useState } from "react";
import { getNotes } from "@/apis/notes";
import type { Note } from "@/types/notes";
import { ShimmerMarker } from "@/components/Shimmer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

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

        <p className="text-sm text-white">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="p-4 space-y-4 pb-2">
          <h2 className="text-2xl font-bold text-white">Active Notes</h2>
          <div className="flex flex-nowrap overflow-x-auto gap-6">
            <div className="w-87.5 shrink-0 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg">
              <Button>
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            {notes
              .filter((note) => note.is_active)
              .map((note) => (
                <div
                  key={note.id}
                  className="w-87.5 shrink-0 p-8 space-y-4 bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg"
                >
                  <h2 className="text-lg font-bold text-white">{note.title}</h2>
                  <p className="text-sm text-white">
                    {note.author_id} -{" "}
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-white">{note.content}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold text-white">Inactive Notes</h2>
          <div className="flex flex-wrap gap-6 ">
            {notes
              .filter((note) => !note.is_active)
              .map((note) => (
                <div
                  key={note.id}
                  className="w-87.5 p-8 space-y-4 bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg"
                >
                  <h2 className="text-lg font-bold text-white">{note.title}</h2>
                  <p className="text-sm text-white">
                    {note.author_id} -{" "}
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-white">{note.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
