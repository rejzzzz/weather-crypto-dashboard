import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Cryptocurrency, CryptoMarketData } from "@/types/crypto"

interface CryptoState {
  cryptocurrencies: Cryptocurrency[]
  marketData: Record<string, CryptoMarketData>
  historicalData: Record<string, any>
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  cryptocurrencies: [],
  marketData: {},
  historicalData: {},
  loading: false,
  error: null,
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCryptocurrencies: (state, action: PayloadAction<Cryptocurrency[]>) => {
      state.cryptocurrencies = action.payload
    },
    setMarketData: (state, action: PayloadAction<{ cryptoId: string; data: CryptoMarketData }>) => {
      state.marketData[action.payload.cryptoId] = action.payload.data
    },
    setHistoricalData: (state, action: PayloadAction<{ cryptoId: string; data: any }>) => {
      state.historicalData[action.payload.cryptoId] = action.payload.data
    },
    updatePrice: (state, action: PayloadAction<{ cryptoId: string; price: number; change: number }>) => {
      const { cryptoId, price, change } = action.payload
      if (state.marketData[cryptoId]) {
        state.marketData[cryptoId].price = price
        state.marketData[cryptoId].change = change
      }
    },
  },
})

export const { setLoading, setError, setCryptocurrencies, setMarketData, setHistoricalData, updatePrice } =
  cryptoSlice.actions

export default cryptoSlice.reducer

