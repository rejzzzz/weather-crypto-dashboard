import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { City, WeatherData, WeatherForecast } from "@/types/weather"

// This would be replaced with your actual API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your_api_key"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Mock data for cities
const mockCities = [
  { id: "new-york", name: "New York", country: "United States" },
  { id: "london", name: "London", country: "United Kingdom" },
  { id: "tokyo", name: "Tokyo", country: "Japan" },
  { id: "sydney", name: "Sydney", country: "Australia" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "dubai", name: "Dubai", country: "UAE" },
]

// Mock data for weather
const mockWeather: Record<string, WeatherData> = {
  "new-york": {
    cityId: "new-york",
    temperature: 72,
    humidity: 65,
    condition: "Partly Cloudy",
    windSpeed: "8 mph",
    icon: "☁️",
  },
  london: {
    cityId: "london",
    temperature: 62,
    humidity: 80,
    condition: "Rainy",
    windSpeed: "12 mph",
    icon: "🌧️",
  },
  tokyo: {
    cityId: "tokyo",
    temperature: 81,
    humidity: 70,
    condition: "Sunny",
    windSpeed: "5 mph",
    icon: "☀️",
  },
  sydney: {
    cityId: "sydney",
    temperature: 68,
    humidity: 55,
    condition: "Clear",
    windSpeed: "10 mph",
    icon: "🌤️",
  },
  paris: {
    cityId: "paris",
    temperature: 70,
    humidity: 60,
    condition: "Partly Cloudy",
    windSpeed: "7 mph",
    icon: "⛅",
  },
  dubai: {
    cityId: "dubai",
    temperature: 95,
    humidity: 40,
    condition: "Hot",
    windSpeed: "9 mph",
    icon: "🔥",
  },
}

// Mock data for forecasts
const mockForecasts: Record<string, WeatherForecast> = {
  "new-york": {
    cityId: "new-york",
    daily: [
      { day: "Monday", high: 75, low: 62, condition: "Sunny" },
      { day: "Tuesday", high: 78, low: 65, condition: "Partly Cloudy" },
      { day: "Wednesday", high: 72, low: 60, condition: "Rainy" },
      { day: "Thursday", high: 68, low: 58, condition: "Cloudy" },
      { day: "Friday", high: 70, low: 60, condition: "Partly Cloudy" },
      { day: "Saturday", high: 74, low: 62, condition: "Sunny" },
      { day: "Sunday", high: 76, low: 64, condition: "Sunny" },
    ],
    hourly: [
      { time: "12 AM", temp: 65, humidity: 70 },
      { time: "3 AM", temp: 63, humidity: 72 },
      { time: "6 AM", temp: 62, humidity: 75 },
      { time: "9 AM", temp: 68, humidity: 68 },
      { time: "12 PM", temp: 72, humidity: 65 },
      { time: "3 PM", temp: 74, humidity: 60 },
      { time: "6 PM", temp: 70, humidity: 62 },
      { time: "9 PM", temp: 67, humidity: 68 },
    ],
  },
  london: {
    cityId: "london",
    daily: [
      { day: "Monday", high: 64, low: 55, condition: "Rainy" },
      { day: "Tuesday", high: 62, low: 54, condition: "Cloudy" },
      { day: "Wednesday", high: 60, low: 52, condition: "Rainy" },
      { day: "Thursday", high: 63, low: 54, condition: "Cloudy" },
      { day: "Friday", high: 65, low: 56, condition: "Partly Cloudy" },
      { day: "Saturday", high: 67, low: 58, condition: "Partly Cloudy" },
      { day: "Sunday", high: 66, low: 57, condition: "Cloudy" },
    ],
    hourly: [
      { time: "12 AM", temp: 58, humidity: 82 },
      { time: "3 AM", temp: 56, humidity: 85 },
      { time: "6 AM", temp: 55, humidity: 86 },
      { time: "9 AM", temp: 58, humidity: 83 },
      { time: "12 PM", temp: 62, humidity: 80 },
      { time: "3 PM", temp: 63, humidity: 78 },
      { time: "6 PM", temp: 60, humidity: 79 },
      { time: "9 PM", temp: 59, humidity: 81 },
    ],
  },
  // Add more cities as needed
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      queryFn: () => {
        // Return mock data instead of making an API call
        return { data: mockCities }
      },
    }),
    getCurrentWeather: builder.query<WeatherData, string>({
      queryFn: (cityId) => {
        // Return mock data for the requested city
        if (mockWeather[cityId]) {
          return { data: mockWeather[cityId] }
        }
        return {
          error: {
            status: 404,
            data: "City not found",
          },
        }
      },
    }),
    getWeatherForecast: builder.query<WeatherForecast, string>({
      queryFn: (cityId) => {
        // Return mock data for the requested city
        if (mockForecasts[cityId]) {
          return { data: mockForecasts[cityId] }
        }
        return {
          error: {
            status: 404,
            data: "Forecast not found",
          },
        }
      },
    }),
  }),
})

export const { useGetCitiesQuery, useGetCurrentWeatherQuery, useGetWeatherForecastQuery } = weatherApi

