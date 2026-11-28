interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  published_at: string;
  url: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: 1,
    title: "Holiday Flower Demand Expected to Rise in December",
    description:
      "Florists are preparing for increased demand for seasonal arrangements and festive bouquets.",
    category: "Market Trends",
    source: "Floral Industry News",
    published_at: "2026-11-27",
    url: "#",
  },
  {
    id: 2,
    title: "Wholesale Rose Prices Increase Ahead of the Holiday Season",
    description:
      "Retailers are encouraged to review inventory levels and plan upcoming purchases.",
    category: "Supply Chain",
    source: "Floral Market Insights",
    published_at: "2026-11-25",
    url: "#",
  },
  {
    id: 3,
    title: "Sustainable Floral Packaging Gains Popularity",
    description:
      "More flower shops are adopting recyclable wrapping materials and eco-friendly alternatives.",
    category: "Floral Design",
    source: "Floral Business Journal",
    published_at: "2026-11-23",
    url: "#",
  },
];
