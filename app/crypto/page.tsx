"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Clock, Globe } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCryptocurrenciesQuery, useGetCryptoMarketDataQuery } from "@/lib/services/cryptoApi"

export default function CryptosPage() {
  const { data: cryptos, isLoading, error } = useGetCryptocurrenciesQuery()

  if (isLoading) {
    return <CryptosPageSkeleton />
  }

  if (error || !cryptos) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cryptocurrencies</h1>
          <p className="text-muted-foreground">Failed to load cryptocurrencies. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cryptocurrencies</h1>
        <p className="text-muted-foreground">View live cryptocurrency prices and market data.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  )
}

function CryptoCard({ crypto }: { crypto: { id: string; name: string; symbol: string; icon: string } }) {
  const { data: marketData, isLoading, error } = useGetCryptoMarketDataQuery(crypto.id)

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

  if (error || !marketData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{crypto.name}</CardTitle>
          <CardDescription>{crypto.symbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Failed to load market data</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href={`/crypto/${crypto.id}`}>Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Mock additional data that would come from the API
  const mockData = {
    volume: marketData.volume,
    supply: marketData.supply,
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <span className="mr-2 text-xl">{crypto.icon}</span>
              {crypto.name}
            </CardTitle>
            <CardDescription>{crypto.symbol}</CardDescription>
          </div>
          <div className={marketData.change >= 0 ? "text-green-500" : "text-red-500"}>
            {marketData.change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold">${marketData.price.toLocaleString()}</div>
            <div className={marketData.change >= 0 ? "text-green-500" : "text-red-500"}>
              {marketData.change >= 0 ? "+" : ""}
              {marketData.change}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Market Cap: {marketData.marketCap}</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Volume: {mockData.volume}</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Supply: {mockData.supply}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>24h Change</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/crypto/${crypto.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CryptosPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cryptocurrencies</h1>
        <p className="text-muted-foreground">View live cryptocurrency prices and market data.</p>
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

