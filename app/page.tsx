import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
      <div className="text-center space-y-6 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Welcome to the Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          View weather updates, cryptocurrency prices, and the latest news all in one place.
        </p>
        <Button size="lg" asChild className="px-6">
          <Link href="/dashboard" className="flex items-center">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

