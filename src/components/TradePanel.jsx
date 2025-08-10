import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTradingStore } from '@/hooks/useTradingStore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';

const TradePanel = ({ trend, setTrend, timeframe, setTimeframe, showMA, setShowMA }) => {
  const [amount, setAmount] = useState(1000);
  const { balance, openPosition } = useTradingStore();

  const handleTrade = (type) => {
    if (amount > balance) {
      alert('Insufficient funds');
      return;
    }
    // In a real scenario, you'd get the current price from a live feed.
    // For this simulation, we'll use a placeholder price.
    const currentPrice = 100 + Math.random() * 10; // Simulated current price
    openPosition(type, amount, currentPrice);
    setAmount(1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Terminal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6">
          <Label>Chart Settings</Label>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 justify-between">{trend.charAt(0).toUpperCase() + trend.slice(1)} <ChevronDown className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setTrend('bull')}>Bull</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTrend('bear')}>Bear</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTrend('sideways')}>Sideways</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 justify-between">{timeframe} <ChevronDown className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {['1M', '5M', '15M', '1H', '4H', '1D'].map(tf => (
                  <DropdownMenuItem key={tf} onSelect={() => setTimeframe(tf)}>{tf}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ma-toggle" checked={showMA} onCheckedChange={setShowMA} />
            <label htmlFor="ma-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Show 20 MA
            </label>
          </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy / Long</TabsTrigger>
            <TabsTrigger value="short">Sell / Short</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="buy-amount">Amount (USD)</Label>
                <Input id="buy-amount" type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
              </div>
              <Button onClick={() => handleTrade('buy')} className="bg-success/80 hover:bg-success text-white">Buy</Button>
            </div>
          </TabsContent>
          <TabsContent value="short">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="short-amount">Amount (USD)</Label>
                <Input id="short-amount" type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
              </div>
              <Button onClick={() => handleTrade('short')} className="bg-danger/80 hover:bg-danger text-white">Short</Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradePanel;
