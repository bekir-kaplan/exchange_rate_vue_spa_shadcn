/**
 * Finance API Response Types
 * ----------------------------------
 * These interfaces define the structure of **responses** returned
 * after querying the Finance API.
 */

export interface IApiSymbolsResponse {
  success: boolean
  symbols: Record<string, string> // e.g. { "USD": "United States Dollar" }
}

export interface IApiLatestRatesResponse {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Record<string, number>
}

export interface IApiHistoricalRatesResponse {
  success: boolean
  historical: boolean
  date: string
  timestamp: number
  base: string
  rates: Record<string, number>
}

export interface IApiConvertResponse {
  success: boolean
  query: {
    from: string
    to: string
    amount: number
  }
  info: {
    timestamp: number
    rate: number
  }
  historical: boolean | string
  date: string
  result: number
}

export interface IApiTimeSeriesResponse {
  success: boolean
  timeseries: boolean
  start_date: string
  end_date: string
  base: string
  rates: Record<string, Record<string, number>>
}

export interface IApiFluctuationResponse {
  success: boolean
  fluctuation: boolean
  start_date: string
  end_date: string
  base: string
  rates: Record<
    string,
    {
      start_rate: number
      end_rate: number
      change: number
      change_pct: number
    }
  >
}
