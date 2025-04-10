"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown, DollarSign, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCryptocurrenciesQuery, useGetCryptoMarketDataQuery } from "@/lib/services/cryptoApi"

export default function CryptoSection() {
  const { data: cryptos, isLoading: isLoadingCryptos, error: cryptosError } = useGetCryptocurrenciesQuery()

  if (isLoadingCryptos) {
    return <CryptoSectionSkeleton />
  }

  if (cryptosError || !cryptos) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">Cryptocurrency</h2>
        </div>
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            Failed to load cryptocurrency data. Please try again later.
          </p>
        </Card>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Cryptocurrency</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/crypto" className="whitespace-nowrap">
            View All Cryptos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cryptos.slice(0, 3).map((crypto) => (
          <CryptoCard
            key={crypto.id}
            cryptoId={crypto.id}
            cryptoName={crypto.name}
            cryptoSymbol={crypto.symbol}
            cryptoIcon={crypto.icon}
          />
        ))}
      </div>
    </section>
  )
}

function CryptoCard({
  cryptoId,
  cryptoName,
  cryptoSymbol,
  cryptoIcon,
}: {
  cryptoId: string
  cryptoName: string
  cryptoSymbol: string
  cryptoIcon: string
}) {
  const { data: marketData, isLoading, error } = useGetCryptoMarketDataQuery(cryptoId)

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

  if (error || !marketData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{cryptoName}</CardTitle>
          <CardDescription>{cryptoSymbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Failed to load market data</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link href={`/crypto/${cryptoId}`}>Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="mr-2 text-xl">{cryptoIcon}</span>
          {cryptoName}
          <span className="ml-2 text-sm text-muted-foreground">{cryptoSymbol}</span>
        </CardTitle>
        <CardDescription>
          <span className="text-lg font-bold">${marketData.price.toLocaleString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            {marketData.change >= 0 ? (
              <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
            )}
            <span className={marketData.change >= 0 ? "text-green-500" : "text-red-500"}>
              {marketData.change >= 0 ? "+" : ""}
              {marketData.change}%
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{marketData.marketCap}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={`/crypto/${cryptoId}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CryptoSectionSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Cryptocurrency</h2>
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

