import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserPreferencesState {
  favoriteCities: string[]
  favoriteCryptos: string[]
  theme: "light" | "dark" | "system"
}

const initialState: UserPreferencesState = {
  favoriteCities: [],
  favoriteCryptos: [],
  theme: "system",
}

export const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const cityId = action.payload
      if (state.favoriteCities.includes(cityId)) {
        state.favoriteCities = state.favoriteCities.filter((id) => id !== cityId)
      } else {
        state.favoriteCities.push(cityId)
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const cryptoId = action.payload
      if (state.favoriteCryptos.includes(cryptoId)) {
        state.favoriteCryptos = state.favoriteCryptos.filter((id) => id !== cryptoId)
      } else {
        state.favoriteCryptos.push(cryptoId)
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto, setTheme } = userPreferencesSlice.actions

export default userPreferencesSlice.reducer

