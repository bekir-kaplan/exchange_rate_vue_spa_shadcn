/**
 * Finance API Request Types
 * ----------------------------------
 * These interfaces define the structure of **request parameters**
 * used when querying the Finance API.
 *
 * Features:
 * - `IFinReqTimeSeries`: Defines parameters for fetching time series data.
 * - `IFinReqQuote`: Defines parameters for retrieving financial quotes.
 * - `IFinReqMarketState`: Defines parameters for checking market state.
 */

type Year = `${number}${number}${number}${number}`
type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`
type Day = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `${1 | 2}${number}` | `3${0 | 1}`
export type IDateString = `${Year}-${Month}-${Day}`

export interface IFinLatestRatesRequest {
  base?: string
  symbols?: string[]
}

export interface IFinHistoricalRatesRequest {
  date: IDateString
  base: string
  symbols?: string[]
}

export interface IFinConvertRequest {
  from: string
  to: string
  amount: number
}

export interface IFinTimeSeriesRequest {
  startDate: IDateString
  endDate: IDateString
  base: string
  symbols?: string[]
}

export interface IFinFluctuationRequest {
  startDate: IDateString
  endDate: IDateString
  base: string
  symbols?: string[]
}
