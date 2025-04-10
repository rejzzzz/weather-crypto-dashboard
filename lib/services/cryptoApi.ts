import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Cryptocurrency, CryptoMarketData } from "@/types/crypto"

// Mock data for cryptocurrencies
const mockCryptos: Cryptocurrency[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { id: "solana", name: "Solana", symbol: "SOL", icon: "◎" },
  { id: "cardano", name: "Cardano", symbol: "ADA", icon: "₳" },
  { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT", icon: "●" },
]

// Mock data for market data
const mockMarketData: Record<string, CryptoMarketData> = {
  bitcoin: {
    id: "bitcoin",
    price: 42356.78,
    change: 2.34,
    marketCap: "820.5B",
    volume: "24.6B",
    supply: "19.4M",
    maxSupply: "21M",
  },
  ethereum: {
    id: "ethereum",
    price: 2356.42,
    change: -1.24,
    marketCap: "280.3B",
    volume: "12.8B",
    supply: "120.2M",
    maxSupply: "∞",
  },
  solana: {
    id: "solana",
    price: 98.76,
    change: 5.67,
    marketCap: "42.1B",
    volume: "3.2B",
    supply: "426.8M",
    maxSupply: "∞",
  },
  cardano: {
    id: "cardano",
    price: 0.45,
    change: 1.23,
    marketCap: "15.8B",
    volume: "0.9B",
    supply: "35.1B",
    maxSupply: "45B",
  },
  ripple: {
    id: "ripple",
    price: 0.56,
    change: -0.78,
    marketCap: "30.2B",
    volume: "1.5B",
    supply: "53.9B",
    maxSupply: "100B",
  },
  polkadot: {
    id: "polkadot",
    price: 6.32,
    change: 3.45,
    marketCap: "8.1B",
    volume: "0.5B",
    supply: "1.3B",
    maxSupply: "∞",
  },
}

// Mock historical data
const mockHistoricalData: Record<string, any> = {
  bitcoin: {
    prices: [
      [1617235200000, 41250.45],
      [1617321600000, 41500.32],
      [1617408000000, 42100.78],
      [1617494400000, 41800.21],
      [1617580800000, 42200.45],
      [1617667200000, 42500.67],
      [1617753600000, 42356.78],
    ],
  },
  ethereum: {
    prices: [
      [1617235200000, 2400.12],
      [1617321600000, 2380.45],
      [1617408000000, 2350.67],
      [1617494400000, 2320.89],
      [1617580800000, 2340.23],
      [1617667200000, 2360.78],
      [1617753600000, 2356.42],
    ],
  },
  // Add more cryptocurrencies as needed
}

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3" }),
  endpoints: (builder) => ({
    getCryptocurrencies: builder.query<Cryptocurrency[], void>({
      queryFn: () => {
        // Return mock data instead of making an API call
        return { data: mockCryptos }
      },
    }),
    getCryptoMarketData: builder.query<CryptoMarketData, string>({
      queryFn: (cryptoId) => {
        // Return mock data for the requested cryptocurrency
        if (mockMarketData[cryptoId]) {
          return { data: mockMarketData[cryptoId] }
        }
        return {
          error: {
            status: 404,
            data: "Cryptocurrency not found",
          },
        }
      },
    }),
    getCryptoHistoricalData: builder.query<any, { cryptoId: string; days: number }>({
      queryFn: ({ cryptoId }) => {
        // Return mock data for the requested cryptocurrency
        if (mockHistoricalData[cryptoId]) {
          return { data: mockHistoricalData[cryptoId] }
        }
        return {
          error: {
            status: 404,
            data: "Historical data not found",
          },
        }
      },
    }),
  }),
})

export const { useGetCryptocurrenciesQuery, useGetCryptoMarketDataQuery, useGetCryptoHistoricalDataQuery } = cryptoApi

