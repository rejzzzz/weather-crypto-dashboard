"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { updatePrice } from "@/lib/redux/slices/cryptoSlice"
import { addNotification } from "@/lib/redux/slices/notificationsSlice"
import { cryptoWebSocket, weatherWebSocket } from "@/lib/services/websocketService"

// Helper to throttle notifications
const NOTIFICATION_THROTTLE = 60000 // 1 minute between notifications

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  // Use state to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false)
  // Use ref to track last notifications to prevent duplicates
  const lastNotifications = useRef<Record<string, number>>({})

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true)

    // Connect to WebSockets only on client side
    if (typeof window !== "undefined") {
      cryptoWebSocket.connect()
      weatherWebSocket.connect()
    }

    // Subscribe to crypto price updates
    const handleCryptoUpdate = (data: any) => {
      // Process price updates
      if (data.bitcoin) {
        const newPrice = Number.parseFloat(data.bitcoin)
        const oldPrice = 42000 // This would come from your Redux store in a real app
        const percentChange = ((newPrice - oldPrice) / oldPrice) * 100

        dispatch(
          updatePrice({
            cryptoId: "bitcoin",
            price: newPrice,
            change: percentChange,
          }),
        )

        // Create notification for significant price changes (e.g., > 5%)
        // But only if we haven't sent one recently
        const now = Date.now()
        if (
          Math.abs(percentChange) > 5 &&
          (!lastNotifications.current["bitcoin"] || now - lastNotifications.current["bitcoin"] > NOTIFICATION_THROTTLE)
        ) {
          dispatch(
            addNotification({
              type: "price_alert",
              title: "Bitcoin Price Alert",
              message: `Bitcoin price has ${percentChange > 0 ? "increased" : "decreased"} by ${Math.abs(percentChange).toFixed(2)}%`,
            }),
          )

          lastNotifications.current["bitcoin"] = now
        }
      }

      if (data.ethereum) {
        const newPrice = Number.parseFloat(data.ethereum)
        const oldPrice = 2300 // This would come from your Redux store in a real app
        const percentChange = ((newPrice - oldPrice) / oldPrice) * 100

        dispatch(
          updatePrice({
            cryptoId: "ethereum",
            price: newPrice,
            change: percentChange,
          }),
        )

        // Create notification for significant price changes
        // But only if we haven't sent one recently
        const now = Date.now()
        if (
          Math.abs(percentChange) > 5 &&
          (!lastNotifications.current["ethereum"] ||
            now - lastNotifications.current["ethereum"] > NOTIFICATION_THROTTLE)
        ) {
          dispatch(
            addNotification({
              type: "price_alert",
              title: "Ethereum Price Alert",
              message: `Ethereum price has ${percentChange > 0 ? "increased" : "decreased"} by ${Math.abs(percentChange).toFixed(2)}%`,
            }),
          )

          lastNotifications.current["ethereum"] = now
        }
      }
    }

    // Subscribe to weather alerts
    const handleWeatherAlert = (data: any) => {
      const now = Date.now()
      const alertKey = `weather_${data.city}`

      // Only send weather alerts once per hour
      if (!lastNotifications.current[alertKey] || now - lastNotifications.current[alertKey] > 3600000) {
        dispatch(
          addNotification({
            type: "weather_alert",
            title: `Weather Alert: ${data.city}`,
            message: data.message,
          }),
        )

        lastNotifications.current[alertKey] = now
      }
    }

    if (isMounted && typeof window !== "undefined") {
      cryptoWebSocket.subscribe("message", handleCryptoUpdate)
      weatherWebSocket.subscribe("weather_alert", handleWeatherAlert)
    }

    // Cleanup on unmount
    return () => {
      if (isMounted && typeof window !== "undefined") {
        cryptoWebSocket.unsubscribe("message", handleCryptoUpdate)
        weatherWebSocket.unsubscribe("weather_alert", handleWeatherAlert)
        cryptoWebSocket.disconnect()
        weatherWebSocket.disconnect()
      }
    }
  }, [dispatch, isMounted])

  return <>{children}</>
}

