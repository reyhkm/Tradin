import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { generateCandlestickData, calculateMA } from '@/lib/chartDataGenerator';
import { useTradingStore } from '@/hooks/useTradingStore';

const Chart = ({ trend, timeframe, showMA }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const maSeriesRef = useRef(null);
  const [currentData, setCurrentData] = useState([]);

  const { positions } = useTradingStore();

  const timeframeSettings = {
    '1M': { count: 500, interval: 60 * 1000 },
    '5M': { count: 500, interval: 5 * 60 * 1000 },
    '15M': { count: 500, interval: 15 * 60 * 1000 },
    '1H': { count: 500, interval: 60 * 60 * 1000 },
    '4H': { count: 500, interval: 4 * 60 * 60 * 1000 },
    '1D': { count: 500, interval: 24 * 60 * 60 * 1000 },
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        background: { color: '#0C0A09' }, // Corresponds to bg-background
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: { color: '#2A2A2A' },
        horzLines: { color: '#2A2A2A' },
      },
      crosshair: {
        mode: 1, // Magnet mode
      },
      rightPriceScale: {
        borderColor: '#4A4A4A',
      },
      timeScale: {
        borderColor: '#4A4A4A',
      },
    });

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderDownColor: '#ef5350',
      borderUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      wickUpColor: '#26a69a',
    });

    maSeriesRef.current = chartRef.current.addLineSeries({
      color: '#2962FF',
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 600);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const { count, interval } = timeframeSettings[timeframe];
    const data = generateCandlestickData(count, trend, 100, interval);
    setCurrentData(data);

    if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setData(data);
      chartRef.current.timeScale().fitContent();
    }

    if (maSeriesRef.current) {
      if (showMA) {
        const maData = calculateMA(data, 20);
        maSeriesRef.current.setData(maData);
      } else {
        maSeriesRef.current.setData([]);
      }
    }
  }, [trend, timeframe, showMA]);

  useEffect(() => {
    if (!candlestickSeriesRef.current) return;

    const markers = positions.map(p => ({
      time: p.timestamp / 1000,
      position: 'aboveBar',
      color: p.type === 'buy' ? '#26a69a' : '#ef5350',
      shape: p.type === 'buy' ? 'arrowUp' : 'arrowDown',
      text: `${p.type.toUpperCase()} @ ${p.entryPrice.toFixed(2)}`,
    }));

    candlestickSeriesRef.current.setMarkers(markers);
  }, [positions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentData.length > 0 && candlestickSeriesRef.current) {
        const lastDataPoint = currentData[currentData.length - 1];
        const newPrice = lastDataPoint.close + (Math.random() - 0.5) * 2;
        const newCandle = {
          ...lastDataPoint,
          close: newPrice,
          high: Math.max(lastDataPoint.high, newPrice),
          low: Math.min(lastDataPoint.low, newPrice),
        };
        candlestickSeriesRef.current.update(newCandle);
        // Note: In a real app, you'd also update the MA here.
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [currentData]);

  return <div ref={chartContainerRef} className="w-full h-[600px] bg-card rounded-lg" />;
};

export default Chart;
