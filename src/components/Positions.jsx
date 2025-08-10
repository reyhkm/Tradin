import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTradingStore } from '@/hooks/useTradingStore';
import { Button } from './ui/button';

const Positions = () => {
  const { positions, history, closePosition } = useTradingStore();

  const handleClose = (positionId) => {
    const currentPrice = 100 + Math.random() * 10; // Simulated current price
    closePosition(positionId, currentPrice);
  };

  const calculatePNL = (position) => {
    const currentPrice = 100 + Math.random() * 10; // Simulated current price
    const priceDiff = currentPrice - position.entryPrice;
    const pnl = position.type === 'buy' ? priceDiff * (position.size / position.entryPrice) : -priceDiff * (position.size / position.entryPrice);
    return pnl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Positions & History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open">Open Positions ({positions.length})</TabsTrigger>
            <TabsTrigger value="history">Trade History ({history.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="open" className="mt-4 max-h-60 overflow-y-auto">
            {positions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No open positions.</p>
            ) : (
              <div className="space-y-2">
                {positions.map(pos => {
                  const pnl = calculatePNL(pos);
                  return (
                    <div key={pos.id} className="text-xs p-2 rounded-md bg-secondary flex justify-between items-center">
                      <div>
                        <span className={`font-bold ${pos.type === 'buy' ? 'text-success' : 'text-danger'}`}>{pos.type.toUpperCase()}</span>
                        <span className="ml-2">${pos.size.toFixed(2)} @ ${pos.entryPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`${pnl >= 0 ? 'text-success' : 'text-danger'}`}>{pnl.toFixed(2)}</span>
                        <Button size="sm" variant="destructive" onClick={() => handleClose(pos.id)} className="h-6 px-2 text-xs">Close</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
          <TabsContent value="history" className="mt-4 max-h-60 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No trade history.</p>
            ) : (
              <div className="space-y-2">
                {history.map(trade => (
                  <div key={trade.id} className="text-xs p-2 rounded-md bg-secondary flex justify-between items-center">
                    <div>
                      <span className={`font-bold ${trade.type === 'buy' ? 'text-success' : 'text-danger'}`}>{trade.type.toUpperCase()}</span>
                      <span className="ml-2">${trade.size.toFixed(2)}</span>
                    </div>
                    <div className={`font-bold ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Positions;
