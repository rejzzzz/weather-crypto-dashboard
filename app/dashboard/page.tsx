import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeatherSection from "@/components/dashboard/weather-section"
import CryptoSection from "@/components/dashboard/crypto-section"
import NewsSection from "@/components/dashboard/news-section"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">View all your important information in one place.</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-8">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </TabsContent>

        <TabsContent value="weather">
          <WeatherSection />
        </TabsContent>

        <TabsContent value="crypto">
          <CryptoSection />
        </TabsContent>

        <TabsContent value="news">
          <NewsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

