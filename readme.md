# Next.js Dashboard Application

A modern dashboard application built with Next.js that displays weather updates, cryptocurrency prices, and news all in one place.

## Features

- **Weather Section**
  - View current weather conditions
  - Check weather forecasts
  - Track multiple cities
  - Receive weather alerts

- **Cryptocurrency Section**
  - Real-time cryptocurrency price updates
  - Price change notifications
  - Track Bitcoin and Ethereum
  - Favorite specific cryptocurrencies

- **News Section**
  - Latest news updates
  - Categorized news viewing

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Real-time Updates**: WebSocket
- **UI Components**: 
  - Radix UI
  - Shadcn UI
- **Theme**: Dark/Light mode support

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                 # Next.js 13 app directory
├── components/         # React components
│   ├── dashboard/     # Dashboard-specific components
│   ├── ui/           # Reusable UI components
│   └── websocket/    # WebSocket related components
├── lib/              # Utilities and configurations
│   ├── redux/       # Redux store and slices
│   └── services/    # API services
└── public/          # Static files
```

## Features

- Responsive design
- Real-time data updates
- Dark/Light theme
- Toast notifications
- Mobile-friendly navigation
- Error handling
- Loading states

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.