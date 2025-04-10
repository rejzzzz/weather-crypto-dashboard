"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetNewsArticlesQuery } from "@/lib/services/newsApi"

export default function NewsSection() {
  const { data: articles, isLoading, error } = useGetNewsArticlesQuery({ category: "crypto", limit: 5 })

  if (isLoading) {
    return <NewsSectionSkeleton />
  }

  if (error || !articles) {
    return (
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Latest News</h2>
        </div>
        <Card className="p-6">
          <p className="text-center text-muted-foreground">Failed to load news data. Please try again later.</p>
        </Card>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Latest News</h2>
      </div>

      <div className="space-y-4">
        {articles.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
              <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span>
                  {item.source} • {item.time}
                </span>
                <Link href={item.url} className="flex items-center text-primary hover:underline">
                  Read More
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function NewsSectionSkeleton() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Latest News</h2>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-full" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

