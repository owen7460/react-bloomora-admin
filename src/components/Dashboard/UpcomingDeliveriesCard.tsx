import { Van } from "lucide-react";

export default function UpcomingDeliveriesCard() {
  return (
    <div className="bg-white/25 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-8 space-y-0.5">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-xl font-bold text-primary">Upcoming Deliveries</h2>
        <Van className="text-primary stroke-1 self-start" />
      </div>

      <p className="text-sm text-black">Evergreen Floral Supply</p>
      <p className="text-sm text-primary">Tomorrow · 9:00 AM</p>
      <p className="text-sm text-zinc-600">120 roses, 50 lilies</p>
      <hr className="my-4 border-black/10" />
      <p className="text-sm text-black">Calgary Floral Wholesale</p>
      <p className="text-sm text-zinc-600">Nov 30 · 10:30 AM</p>
      <p className="text-sm text-zinc-600">Wrapping paper & ribbons</p>
    </div>
  );
}
