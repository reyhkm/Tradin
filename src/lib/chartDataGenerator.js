export const generateCandlestickData = (count, trend, startPrice, interval) => {
  const data = [];
  let price = startPrice;
  let currentTime = new Date().getTime() - count * interval;

  for (let i = 0; i < count; i++) {
    const open = price;
    let close;

    const volatility = Math.random() * 2;
    const trendStrength = Math.random() * 0.5;

    if (trend === 'bull') {
      close = open + trendStrength + (Math.random() - 0.4) * volatility;
    } else if (trend === 'bear') {
      close = open - trendStrength - (Math.random() - 0.4) * volatility;
    } else { // sideways
      close = open + (Math.random() - 0.5) * volatility;
    }

    if (close < 1) close = 1; // Prevent price from going below 1

    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;

    data.push({
      time: currentTime / 1000, // lightweight-charts expects seconds
      open,
      high,
      low,
      close,
    });

    price = close;
    currentTime += interval;
  }

  return data;
};

export const calculateMA = (data, period) => {
  const maData = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
      maData.push({
        time: data[i].time,
        value: sum / period,
      });
    }
  }
  return maData;
};
