"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Wind, Sunrise, Sunset } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCitiesQuery, useGetCurrentWeatherQuery } from "@/lib/services/weatherApi"

export default function CitiesPage() {
  const { data: cities, isLoading, error } = useGetCitiesQuery()

  if (isLoading) {
    return <CitiesPageSkeleton />
  }

  if (error || !cities) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cities</h1>
          <p className="text-muted-foreground">Failed to load cities. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cities</h1>
        <p className="text-muted-foreground">View weather information for cities around the world.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  )
}

function CityCard({ city }: { city: { id: string; name: string; country: string } }) {
  const { data: weather, isLoading, error } = useGetCurrentWeatherQuery(city.id)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{city.name}</CardTitle>
          <CardDescription>{city.country}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Failed to load weather data</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href={`/city/${city.id}`}>Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Mock additional data that would come from the API
  const mockData = {
    windSpeed: weather.windSpeed,
    sunrise: "6:24 AM",
    sunset: "7:32 PM",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{city.name}</CardTitle>
            <CardDescription>{city.country}</CardDescription>
          </div>
          <span className="text-3xl">{weather.icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl sm:text-3xl font-bold">{weather.temperature}°F</div>
            <div className="text-muted-foreground">{weather.condition}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Wind: {mockData.windSpeed}</span>
            </div>
            <div className="flex items-center">
              <Sunrise className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Sunrise: {mockData.sunrise}</span>
            </div>
            <div className="flex items-center">
              <Sunset className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Sunset: {mockData.sunset}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/city/${city.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CitiesPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cities</h1>
        <p className="text-muted-foreground">View weather information for cities around the world.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

