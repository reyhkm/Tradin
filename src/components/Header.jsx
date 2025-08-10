import { Coins } from 'lucide-react';
import { useTradingStore } from '@/hooks/useTradingStore';

export default function Header() {
  const { balance, positions } = useTradingStore();

  const calculateTotalPNL = () => {
    // This is a simplified PNL calculation. In a real app, you'd need current price.
    // For this simulation, we'll just show the balance.
    return 0;
  };

  const totalValue = balance + calculateTotalPNL();

  return (
    <header className="border-b border-border p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">React Trading Simulator</h1>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground">Balance</span>
          <span className="font-semibold text-lg">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </header>
  );
}
