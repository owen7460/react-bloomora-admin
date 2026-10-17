import type { AgentSuggestion } from "@/types/suggestions";

// Mock examples for the dashboard; these are not generated from live store data.
export const agentSuggestions: AgentSuggestion[] = [
  {
    id: "review-stock",
    title: "Review low-stock flowers",
    description: "Check the Stock Alert card and confirm upcoming orders before placing a supplier order.",
  },
  {
    id: "reserve-preorders",
    title: "Reserve stems for pre-orders",
    description: "Review tomorrow's orders and set aside the required stems before arranging the shop display.",
  },
  {
    id: "check-freshness",
    title: "Check flower freshness",
    description: "Inspect display buckets, remove damaged stems, and refresh water before opening.",
  },
  {
    id: "plan-seasonal-range",
    title: "Plan seasonal arrangements",
    description: "Review the upcoming holiday calendar and prepare a small selection of seasonal bouquet designs.",
  },
];
