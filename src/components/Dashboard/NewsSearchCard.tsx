import { cn } from "@/lib/utils";
import { mockNews } from "@/data/newsSearch";

export default function NewsSearchCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/25 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-8",
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-primary">News Search</h2>
      <ul className="space-y-4">
        {mockNews.map((news) => (
          <li key={news.id}>
            <h3 className="text-lg font-bold">{news.title}</h3>
            <p className="text-sm text-black">{news.source}</p>
            <p className="text-sm text-black">{news.category}</p>
            <p className="text-sm text-zinc-700">{news.published_at}</p>
            <p className="text-sm text-black">{news.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
