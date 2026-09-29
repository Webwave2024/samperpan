"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (priceStr: string | number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

// Static fallback rates (1 INR = X currency) — updated occasionally
const FALLBACK_RATES: Record<string, number> = {
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  SAR: 0.045,
  JPY: 1.80,
  CAD: 0.016,
  AUD: 0.018,
  CHF: 0.011,
  SGD: 0.016,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>("INR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    // Load saved currency
    try {
      const saved = localStorage.getItem("currency");
      if (saved) setCurrencyState(saved);
    } catch (e) {}

    // Try to fetch live rates from Frankfurter — silently fall back if unavailable
    const fetchRates = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?from=INR", {
          signal: AbortSignal.timeout(5000), // 5s timeout
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data && data.rates) {
          setRates(data.rates);
        }
      } catch (e) {
        // Silently use static fallback rates — already set as default state
        console.info("Frankfurter API unavailable, using static exchange rates.");
      }
    };

    fetchRates();
  }, []);

  const setCurrency = (cur: string) => {
    setCurrencyState(cur);
    try {
      localStorage.setItem("currency", cur);
    } catch (e) {}
    window.dispatchEvent(new Event("currencyChanged"));
  };

  const formatPrice = (priceStr: string | number) => {
    if (!priceStr) return "";
    
    // Extract number from string like "₹38,499"
    let basePrice = typeof priceStr === "number" ? priceStr : parseInt(String(priceStr).replace(/\D/g, ""), 10);
    if (isNaN(basePrice)) return String(priceStr);

    if (currency === "INR") {
      return `₹${basePrice.toLocaleString("en-IN")}`;
    }

    const rate = rates[currency];
    if (!rate) {
      // Fallback if rates haven't loaded yet
      return `₹${basePrice.toLocaleString("en-IN")}`;
    }

    const converted = basePrice * rate;

    // Formatting based on currency
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Safe SSR fallback — provider hasn't mounted yet
    return {
      currency: "INR",
      setCurrency: (_: string) => {},
      formatPrice: (priceStr: string | number) => {
        const num = typeof priceStr === "number"
          ? priceStr
          : parseInt(String(priceStr).replace(/\D/g, ""), 10);
        if (isNaN(num)) return String(priceStr);
        return `₹${num.toLocaleString("en-IN")}`;
      },
    };
  }
  return context;
}
