/**
 * Finance API Time Series Value
 * ----------------------------------
 */
export interface IFinMapLatestRatesRequest {
  base: string
  symbols?: string
}

export interface IFinMapHistoricalRatesRequest {
  date: string
  base: string
  symbols?: string
}

export interface IFinMapConvertRequest {
  from: string
  to: string
  amount: number
}

export interface IFinMapTimeSeriesRequest {
  start_date: string
  end_date: string
  base: string
  symbols?: string
}

export interface IFinMapFluctuationRequest {
  start_date: string
  end_date: string
  base: string
  symbols?: string
}
