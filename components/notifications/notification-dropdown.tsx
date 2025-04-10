"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { markAllAsRead, clearNotifications } from "@/lib/redux/slices/notificationsSlice"

export function NotificationDropdown() {
  const dispatch = useAppDispatch()
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications)

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  const handleClearAll = () => {
    dispatch(clearNotifications())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear all
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
              <div className="flex w-full justify-between">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{notification.message}</span>
              {!notification.read && (
                <Badge variant="outline" className="mt-1">
                  New
                </Badge>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

