import { agentSuggestions } from "@/data/agentSuggestions";
import { cn } from "@/lib/utils";

export default function AgentSuggestionCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-black/20 backdrop-blur-xl border border-white/30 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105",
        className,
      )}
    >
      <h2 className="text-primary text-xl font-bold pb-2">
        Agent Suggestion ✨
      </h2>
      <p className="text-sm text-white pb-4">Suggestions by our AI agent</p>
      {agentSuggestions.length > 0 ? (
        <ul className="space-y-4 text-white">
          {agentSuggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <h3 className="text-base font-medium">{suggestion.title}</h3>
              <p className="text-sm">{suggestion.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white">No suggestions at the moment.</p>
      )}
    </div>
  );
}
