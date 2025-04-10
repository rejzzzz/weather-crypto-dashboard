// This is a mock WebSocket service for real-time data
export class WebSocketService {
  private socket: WebSocket | null = null
  private listeners: { [key: string]: ((data: any) => void)[] } = {}
  private isConnecting = false
  private mockInterval: NodeJS.Timeout | null = null

  constructor(private url: string) {}

  connect() {
    // Don't try to connect if we're in a server environment
    if (typeof window === "undefined") return

    if (this.socket || this.isConnecting) {
      return
    }

    this.isConnecting = true

    try {
      // For demo purposes, instead of actual WebSocket connection,
      // we'll use a mock implementation that emits events periodically
      this.setupMockWebSocket()
      console.log("Mock WebSocket connection established")
    } catch (error) {
      console.error("Error setting up mock WebSocket:", error)
      this.isConnecting = false
    }
  }

  private setupMockWebSocket() {
    // Clear any existing interval
    if (this.mockInterval) {
      clearInterval(this.mockInterval)
    }

    // For crypto WebSocket, emit price updates every 10 seconds
    if (this.url.includes("coincap")) {
      this.mockInterval = setInterval(() => {
        // Generate random price changes that are not too extreme
        const bitcoinPrice = 40000 + Math.random() * 2000
        const ethereumPrice = 2000 + Math.random() * 200

        const data = {
          bitcoin: bitcoinPrice.toString(),
          ethereum: ethereumPrice.toString(),
        }

        this.emitMessage("message", data)
      }, 10000) // Every 10 seconds
    }

    // For weather WebSocket, emit alerts occasionally (every 5 minutes)
    if (this.url.includes("weather")) {
      this.mockInterval = setInterval(() => {
        // Only emit weather alerts 10% of the time to reduce frequency
        if (Math.random() > 0.9) {
          const cities = ["New York", "London", "Tokyo"]
          const randomCity = cities[Math.floor(Math.random() * cities.length)]
          const alerts = ["Heavy rain expected", "High winds warning", "Extreme heat alert", "Thunderstorm warning"]
          const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]

          const data = {
            type: "weather_alert",
            city: randomCity,
            message: randomAlert,
          }

          this.emitMessage("weather_alert", data)
        }
      }, 300000) // Every 5 minutes
    }

    this.isConnecting = false
  }

  private emitMessage(type: string, data: any) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((callback) => callback(data))
    }
  }

  subscribe(eventType: string, callback: (data: any) => void) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = []
    }
    this.listeners[eventType].push(callback)
  }

  unsubscribe(eventType: string, callback: (data: any) => void) {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter((cb) => cb !== callback)
    }
  }

  disconnect() {
    if (this.mockInterval) {
      clearInterval(this.mockInterval)
      this.mockInterval = null
    }

    this.listeners = {}
    console.log("Mock WebSocket connection closed")
  }

  send(data: any) {
    console.log("Mock WebSocket message sent:", data)
  }
}

// Create a singleton instance for crypto price updates
export const cryptoWebSocket = new WebSocketService("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana")

// Create a singleton instance for weather alerts (this would be a mock in a real app)
export const weatherWebSocket = new WebSocketService("wss://example.com/weather-alerts")

