"use client"

import Link from "next/link"
import { Droplets, Thermometer, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCitiesQuery, useGetCurrentWeatherQuery } from "@/lib/services/weatherApi"

export default function WeatherSection() {
  const { data: cities, isLoading: isLoadingCities, error: citiesError } = useGetCitiesQuery()

  if (isLoadingCities) {
    return <WeatherSectionSkeleton />
  }

  if (citiesError || !cities) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">Weather</h2>
        </div>
        <Card className="p-6">
          <p className="text-center text-muted-foreground">Failed to load weather data. Please try again later.</p>
        </Card>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Weather</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/city" className="whitespace-nowrap">
            View All Cities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.slice(0, 3).map((city) => (
          <WeatherCard key={city.id} cityId={city.id} cityName={city.name} />
        ))}
      </div>
    </section>
  )
}

function WeatherCard({ cityId, cityName }: { cityId: string; cityName: string }) {
  const { data: weather, isLoading, error } = useGetCurrentWeatherQuery(cityId)

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{cityName}</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link href={`/city/${cityId}`}>Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          {cityName}
          <span className="text-2xl">{weather.icon}</span>
        </CardTitle>
        <CardDescription>{weather.condition}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <Thermometer className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{weather.temperature}°F</span>
          </div>
          <div className="flex items-center">
            <Droplets className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{weather.humidity}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={`/city/${cityId}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function WeatherSectionSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Weather</h2>
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24 mt-1" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

