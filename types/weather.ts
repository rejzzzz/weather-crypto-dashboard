export interface City {
  id: string
  name: string
  country: string
}

export interface WeatherData {
  cityId: string
  temperature: number
  humidity: number
  condition: string
  windSpeed: string
  icon: string
}

export interface DailyForecast {
  day: string
  high: number
  low: number
  condition: string
}

export interface HourlyForecast {
  time: string
  temp: number
  humidity: number
}

export interface WeatherForecast {
  cityId: string
  daily: DailyForecast[]
  hourly: HourlyForecast[]
}

