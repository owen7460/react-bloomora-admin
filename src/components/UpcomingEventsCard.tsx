import { upcomingEvents } from "@/data/upcomingEvents";

export default function UpcomingEventsCard() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = today.find((part) => part.type === "year")?.value;
  const month = today.find((part) => part.type === "month")?.value;
  const day = today.find((part) => part.type === "day")?.value;
  const todayKey = `${year}-${month}-${day}`;
  const events = upcomingEvents
    .filter((event) => event.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <div className="w-75 bg-gray-100 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105">
      <h2 className="text-primary text-xl font-bold pb-2">
        Upcoming Holidays &amp; Events 📅
      </h2>
      <p className="text-sm text-gray-500 pb-4">Alberta calendar</p>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id}>
              <time
                dateTime={event.date}
                className="text-sm font-medium text-primary"
              >
                {new Intl.DateTimeFormat("en-CA", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${event.date}T00:00:00Z`))}
              </time>
              <h3 className="text-base font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
      )}
    </div>
  );
}
