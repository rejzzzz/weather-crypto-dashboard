import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { NewsArticle } from "@/types/news"

// Mock data for news articles
const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Bitcoin Surges Past $42,000 as Institutional Interest Grows",
    source: "CryptoNews",
    time: "2 hours ago",
    url: "#",
    tags: ["Bitcoin", "Markets"],
  },
  {
    id: "2",
    title: "Ethereum 2.0 Upgrade: What You Need to Know About the Merge",
    source: "BlockchainToday",
    time: "5 hours ago",
    url: "#",
    tags: ["Ethereum", "Technology"],
  },
  {
    id: "3",
    title: "Regulatory Clarity: New Framework for Cryptocurrency Proposed",
    source: "CoinDesk",
    time: "8 hours ago",
    url: "#",
    tags: ["Regulation", "Policy"],
  },
  {
    id: "4",
    title: "DeFi Summer 2.0? Total Value Locked Reaches New All-Time High",
    source: "DeFiPulse",
    time: "12 hours ago",
    url: "#",
    tags: ["DeFi", "Markets"],
  },
  {
    id: "5",
    title: "NFT Market Shows Signs of Recovery After Months of Decline",
    source: "NFTWorld",
    time: "1 day ago",
    url: "#",
    tags: ["NFT", "Art"],
  },
]

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsdata.io/api/1" }),
  endpoints: (builder) => ({
    getNewsArticles: builder.query<NewsArticle[], { category: string; limit: number }>({
      queryFn: ({ limit }) => {
        // Return mock data instead of making an API call
        return { data: mockNewsArticles.slice(0, limit) }
      },
    }),
  }),
})

export const { useGetNewsArticlesQuery } = newsApi

