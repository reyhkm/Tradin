import { useState } from 'react';
import Chart from './components/Chart';
import Header from './components/Header';
import TradePanel from './components/TradePanel';
import Positions from './components/Positions';

function App() {
  const [trend, setTrend] = useState('sideways');
  const [timeframe, setTimeframe] = useState('1D');
  const [showMA, setShowMA] = useState(true);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <Chart 
            trend={trend} 
            timeframe={timeframe} 
            showMA={showMA}
          />
        </div>
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="flex flex-col gap-4">
            <TradePanel 
              trend={trend} 
              setTrend={setTrend} 
              timeframe={timeframe} 
              setTimeframe={setTimeframe}
              showMA={showMA}
              setShowMA={setShowMA}
            />
            <Positions />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
