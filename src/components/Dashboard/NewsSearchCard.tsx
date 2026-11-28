import { cn } from "@/lib/utils";
import { mockNews } from "@/data/newsSearch";

export default function NewsSearchCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/50 backdrop-blur-md border border-white/30 shadow-lg rounded-lg p-8",
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-primary">News Search</h2>
      <ul className="space-y-4 mt-4">
        {mockNews.map((news) => (
          <li key={news.id}>
            <h3 className="text-lg font-medium">{news.title}</h3>
            <p className="text-sm text-black">{news.source}</p>
            <p className="text-sm text-black">{news.category}</p>
            <p className="text-sm text-zinc-600">{news.published_at}</p>
            <p className="text-sm text-black">{news.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
