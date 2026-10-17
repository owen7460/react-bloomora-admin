import { agentSuggestions } from "@/data/agentSuggestions";

export default function AgentSuggestionCard() {
  return (
    <div className="w-75 bg-gray-100 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105">
      <h2 className="text-primary text-xl font-bold pb-2">
        Agent Suggestion ✨
      </h2>
      <p className="text-sm text-gray-500 pb-4">Suggestions by our AI agent</p>
      {agentSuggestions.length > 0 ? (
        <ul className="space-y-4">
          {agentSuggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <h3 className="text-base font-medium">{suggestion.title}</h3>
              <p className="text-sm text-gray-500">{suggestion.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No suggestions at the moment.</p>
      )}
    </div>
  );
}
