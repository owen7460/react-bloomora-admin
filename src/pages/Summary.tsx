import AnnouncementCard from "@/components/AnnouncementCard";

export default function Summary() {
  return (
    <div className="h-screen w-full">
      <h1 className=" text-left p-8 text-4xl font-bold text-primary">
        Welcome to the dashboard, Bloomora Admin
      </h1>
      <div className="p-4">
        <AnnouncementCard />
      </div>
    </div>
  );
}
