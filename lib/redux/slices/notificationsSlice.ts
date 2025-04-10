import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Notification {
  id: string
  type: "price_alert" | "weather_alert"
  title: string
  message: string
  timestamp: number
  read: boolean
}

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "id" | "timestamp" | "read">>) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
        ...action.payload,
      }
      state.notifications.unshift(newNotification)
      state.unreadCount += 1
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount -= 1
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true
      })
      state.unreadCount = 0
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationsSlice.actions

export default notificationsSlice.reducer

