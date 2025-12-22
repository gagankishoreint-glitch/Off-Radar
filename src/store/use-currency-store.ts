import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'SGD';

interface CurrencyState {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set) => ({
            currency: 'INR',
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: 'currency-storage',
        }
    )
);
