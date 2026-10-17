import AnnouncementCard from "@/components/AnnouncementCard";
import LowStockCard from "@/components/LowStockCard";
import UpcomingEventsCard from "@/components/UpcomingEventsCard";

export default function Summary() {
  return (
    <div className="h-screen w-full">
      <h1 className=" text-left p-8 text-4xl font-bold text-primary">
        Welcome to the dashboard, Bloomora Admin
      </h1>
      <div className="flex flex-wrap items-stretch gap-6 p-4">
        <AnnouncementCard />
        <LowStockCard />
        <UpcomingEventsCard />
      </div>
    </div>
  );
}
