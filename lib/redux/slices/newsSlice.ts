import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NewsArticle } from "@/types/news"

interface NewsState {
  articles: NewsArticle[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
}

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.articles = action.payload
    },
  },
})

export const { setLoading, setError, setArticles } = newsSlice.actions

export default newsSlice.reducer

