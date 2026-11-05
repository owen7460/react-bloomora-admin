import AgentSuggestionCard from "@/components/AgentSuggestionCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import LowStockCard from "@/components/LowStockCard";
import UpcomingEventsCard from "@/components/UpcomingEventsCard";
import { useAppSelector } from "@/store/hooks";

export default function Summary() {
  const email = useAppSelector((state) => state.auth.email);
  return (
    <div className="h-screen w-full">
      <div className="p-8 space-y-4">
        <h1 className=" text-left text-4xl font-bold text-primary">
          Welcome, admin -- {email || "."}
        </h1>
        <p className="text-sm text-white">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-wrap items-stretch gap-6 p-4">
        <AnnouncementCard />
        <LowStockCard />
        <UpcomingEventsCard />
        <AgentSuggestionCard />
      </div>
    </div>
  );
}
