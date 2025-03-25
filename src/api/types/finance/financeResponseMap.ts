/**
 * Mapped Data Interfaces
 * ----------------------------------
 * These interfaces define the structure of **mapped** data returned
 * after processing API responses from the Finance.
 *
 * Features:
 * - Finance:
 *   - `IFinMapTimeSeries`: Defines a single time series entry with parsed data.
 *   - `IFinMapResTimeSeries`: Represents a processed time series response.
 *   - `IFinMapQuote`: Structures a financial quote with parsed values.
 *   - `IFinMapMarketState`: Defines market state details in a structured format.
 */

// Currency list
export interface IFinMapCurrencySymbol {
  code: string
  name: string
}

// Exchange rate for a single date
export interface IFinMapExchangeRate {
  date: string
  base: string
  rates: Record<string, number>
}

// Time series for multiple days
export interface IFinMapExchangeRateSeries {
  base: string
  series: {
    date: string
    rates: Record<string, number>
  }[]
}

// Converted amount
export interface IFinMapConvertedAmount {
  from: string
  to: string
  amount: number
  rate: number
  result: number
  date: string
}

// Fluctuation data
export interface IFinMapFluctuationData {
  base: string
  startDate: string
  endDate: string
  changes: {
    currency: string
    startRate: number
    endRate: number
    change: number
    changePercent: number
  }[]
}
