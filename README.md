# React Trading Simulator

A simplified trading simulation application built with React, Vite, and Tailwind CSS, inspired by TradingView.

This project provides a clean interface for simulating trading activities, including buying (long) and shorting assets. It features a dynamic financial chart that can display different market trends (Bull, Bear, Sideways) and supports various timeframes.

## Features

- **Interactive Chart**: Powered by `lightweight-charts`.
- **Market Trend Simulation**: Generate data for Bull, Bear, and Sideways markets.
- **Timeframe Selection**: Switch between different timeframes (e.g., 1D, 1H, 15M).
- **Trading Actions**: Place 'Buy' and 'Short' orders.
- **State Management**: Centralized trading logic using Zustand.
- **Position Tracking**: View open positions and trade history.
- **Technical Analysis**: Includes a simple Moving Average (MA) indicator.
- **Modern UI**: Clean and responsive UI built with Tailwind CSS and Radix UI.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd react-trading-view-sim
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).
