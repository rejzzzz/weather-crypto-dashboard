import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { City, WeatherData } from "@/types/weather"

interface WeatherState {
  cities: City[]
  currentWeather: Record<string, WeatherData>
  forecasts: Record<string, any>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  cities: [],
  currentWeather: {},
  forecasts: {},
  loading: false,
  error: null,
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload
    },
    setCurrentWeather: (state, action: PayloadAction<{ cityId: string; data: WeatherData }>) => {
      state.currentWeather[action.payload.cityId] = action.payload.data
    },
    setForecast: (state, action: PayloadAction<{ cityId: string; data: any }>) => {
      state.forecasts[action.payload.cityId] = action.payload.data
    },
  },
})

export const { setLoading, setError, setCities, setCurrentWeather, setForecast } = weatherSlice.actions

export default weatherSlice.reducer

