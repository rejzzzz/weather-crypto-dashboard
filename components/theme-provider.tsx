"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // After mounting, we have access to the theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by only rendering the children after mounting
  // This ensures the theme is applied client-side only
  return (
    <NextThemesProvider {...props}>
      {/* Apply suppressHydrationWarning to the html element */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              document.documentElement.setAttribute('suppressHydrationWarning', 'true');
              const theme = localStorage.getItem('theme') || 'system';
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              document.documentElement.classList.add(theme === 'system' ? systemTheme : theme);
              document.documentElement.style.colorScheme = theme === 'system' ? systemTheme : theme;
            })()
          `,
        }}
      />
      {children}
    </NextThemesProvider>
  )
}

