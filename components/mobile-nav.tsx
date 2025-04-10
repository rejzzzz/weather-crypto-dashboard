"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, Cloud, Bitcoin, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-6 w-6" />
            <span>Dashboard</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-base transition-colors hover:bg-accent",
                route.active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-2">
          <NotificationDropdown />
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}

