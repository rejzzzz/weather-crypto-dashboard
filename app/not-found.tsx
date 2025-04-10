import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
      </div>
    </div>
  )
}
