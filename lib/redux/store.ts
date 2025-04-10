import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import weatherReducer from "./slices/weatherSlice"
import cryptoReducer from "./slices/cryptoSlice"
import newsReducer from "./slices/newsSlice"
import userPreferencesReducer from "./slices/userPreferencesSlice"
import notificationsReducer from "./slices/notificationsSlice"
import { weatherApi } from "../services/weatherApi"
import { cryptoApi } from "../services/cryptoApi"
import { newsApi } from "../services/newsApi"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    userPreferences: userPreferencesReducer,
    notifications: notificationsReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, cryptoApi.middleware, newsApi.middleware),
})

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

