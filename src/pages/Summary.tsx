import AgentSuggestionCard from "@/components/AgentSuggestionCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import LowStockCard from "@/components/LowStockCard";
import UpcomingEventsCard from "@/components/UpcomingEventsCard";
import { useAppSelector } from "@/store/hooks";
import TotalStockCard from "@/components/Dashboard/TotalStockCard";
import NewsSearchCard from "@/components/Dashboard/NewsSearchCard";

export default function Summary() {
  const email = useAppSelector((state) => state.auth.email);
  return (
    <div className="w-full">
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
      <div className="max-w-[1920px] px-8 grid grid-cols-5 gap-8">
        <TotalStockCard />
        <TotalStockCard />
        <TotalStockCard />
        <AnnouncementCard className="row-span-2" />
        <LowStockCard className="row-span-2" />
        <TotalStockCard />
        <TotalStockCard />
        <TotalStockCard />
        <NewsSearchCard className="col-span-2 row-span-2" />
        <AgentSuggestionCard className="col-span-2 row-span-2" />
        <UpcomingEventsCard className="row-span-2" />
      </div>
    </div>
  );
}
