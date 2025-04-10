"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Cloud, Bitcoin } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import { MobileNav } from "@/components/mobile-nav"

export default function Navbar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      active: pathname === "/dashboard",
    },
    {
      href: "/city",
      label: "Cities",
      icon: Cloud,
      active: pathname.includes("/city"),
    },
    {
      href: "/crypto",
      label: "Crypto",
      icon: Bitcoin,
      active: pathname.includes("/crypto"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BarChart3 className="h-6 w-6" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-5">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="mr-1 h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

