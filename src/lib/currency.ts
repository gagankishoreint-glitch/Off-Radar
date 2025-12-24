export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'SGD';

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
    INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
    USD: { symbol: '$', rate: 0.01174, label: 'USD ($)' }, // 1 INR = ~0.01174 USD (1 USD = 85.18 INR - Dec 24, 2024)
    EUR: { symbol: '€', rate: 0.01129, label: 'EUR (€)' }, // 1 INR = ~0.01129 EUR (1 EUR = 88.56 INR - Dec 24, 2024)
    GBP: { symbol: '£', rate: 0.00936, label: 'GBP (£)' }, // 1 INR = ~0.00936 GBP (1 GBP = 106.84 INR - Dec 24, 2024)
    SGD: { symbol: 'S$', rate: 0.016, label: 'SGD (S$)' }, // 1 INR = ~0.016 SGD (1 SGD = 62.5 INR - Dec 24, 2024)
};

/**
 * Converts a value in Lakhs Per Annum (LPA) to the target currency.
 * 1 LPA = 100,000 INR
 */
export const convertSalary = (lpa: number, currency: CurrencyCode): string => {
    if (currency === 'INR') {
        return `${lpa} LPA`; // Keep original format for INR
    }

    const inrValue = lpa * 100000;
    const convertedValue = inrValue * CURRENCIES[currency].rate;

    // Format for international standards (e.g., $12k)
    if (convertedValue >= 1000) {
        return `${CURRENCIES[currency].symbol}${(convertedValue / 1000).toFixed(1)}k/yr`;
    }

    return `${CURRENCIES[currency].symbol}${Math.round(convertedValue).toLocaleString()}/yr`;
};

/**
 * Returns just the numeric converted value (per year)
 */
export const getConvertedValue = (lpa: number, currency: CurrencyCode): number => {
    if (currency === 'INR') return lpa * 100000;
    return lpa * 100000 * CURRENCIES[currency].rate;
}

/**
 * Formats a raw number (already converted) with symbol
 */
export const formatValue = (value: number, currency: CurrencyCode): string => {
    if (currency === 'INR') {
        // Convert back to Lakhs for display if needed, or just show raw INR?
        // Usually we use this for formatting Monthly values
        return `₹${Math.round(value).toLocaleString()}`;
    }
    return `${CURRENCIES[currency].symbol}${Math.round(value).toLocaleString()}`;
}
