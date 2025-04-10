"use client"

import { useEffect, useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { markAsRead } from "@/lib/redux/slices/notificationsSlice"

export function NotificationToast() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.notifications)
  const [isMounted, setIsMounted] = useState(false)
  const processedNotifications = useRef<Set<string>>(new Set())

  useEffect(() => {
    setIsMounted(true)
    return () => {
      processedNotifications.current.clear()
    }
  }, [])

  // Show toast for new notifications
  useEffect(() => {
    if (!isMounted) return

    // Only process if we have notifications
    if (notifications.length > 0) {
      // Get unread notifications that we haven't processed yet
      const newNotifications = notifications.filter(
        (notification) => !notification.read && !processedNotifications.current.has(notification.id),
      )

      // Process only the most recent notification to avoid toast spam
      if (newNotifications.length > 0) {
        const latestNotification = newNotifications[0]

        toast({
          title: latestNotification.title,
          description: latestNotification.message,
          variant: latestNotification.type === "price_alert" ? "default" : "destructive",
        })

        // Mark as read after showing toast
        dispatch(markAsRead(latestNotification.id))

        // Add to our processed set
        processedNotifications.current.add(latestNotification.id)
      }
    }
  }, [notifications, toast, dispatch, isMounted])

  return null
}

