import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTradingStore = create(
  persist(
    (set, get) => ({
      balance: 10000,
      positions: [],
      history: [],
      nextId: 1,

      openPosition: (type, size, entryPrice) => {
        const { balance, nextId } = get();
        if (size > balance) {
          console.error('Insufficient funds');
          return;
        }

        const newPosition = {
          id: nextId,
          type, // 'buy' or 'short'
          size, // The amount in USD
          entryPrice,
          timestamp: new Date().getTime(),
        };

        set(state => ({
          balance: state.balance - size,
          positions: [...state.positions, newPosition],
          nextId: state.nextId + 1,
        }));
      },

      closePosition: (positionId, closePrice) => {
        const { positions } = get();
        const positionToClose = positions.find(p => p.id === positionId);

        if (!positionToClose) {
          console.error('Position not found');
          return;
        }

        const { type, size, entryPrice } = positionToClose;
        const quantity = size / entryPrice; // Number of units/shares

        let pnl = 0;
        if (type === 'buy') {
          pnl = (closePrice - entryPrice) * quantity;
        } else { // 'short'
          pnl = (entryPrice - closePrice) * quantity;
        }

        const returnAmount = size + pnl;

        const closedTrade = {
          ...positionToClose,
          closePrice,
          pnl,
          closeTimestamp: new Date().getTime(),
        };

        set(state => ({
          balance: state.balance + returnAmount,
          positions: state.positions.filter(p => p.id !== positionId),
          history: [closedTrade, ...state.history],
        }));
      },
    }),
    {
      name: 'trading-sim-storage', // name of the item in the storage (must be unique)
    }
  )
);
