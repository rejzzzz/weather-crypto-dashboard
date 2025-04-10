export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  icon: string
}

export interface CryptoMarketData {
  id: string
  price: number
  change: number
  marketCap: string
  volume: string
  supply: string
  maxSupply: string
}

export interface CryptoHistoricalDataPoint {
  date: number // timestamp
  price: number
}

export interface CryptoMarket {
  exchange: string
  pair: string
  price: number
  volume: string
}

