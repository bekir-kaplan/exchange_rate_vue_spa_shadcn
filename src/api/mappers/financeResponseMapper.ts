/**
 * Finance API Mappers
 * --------------------------
 * This module provides functions to transform raw API responses
 * from the Finance API into structured, application-friendly formats.
 *
 * Features:
 * - `mapTimeSeries`: Converts time series response data into a mapped object.
 * - `mapTimeSeriesValue`: Parses individual time series entries.
 * - `mapQuote`: Maps quote response data with structured price and volume details.
 * - `mapMarketState`: Converts market state response into a readable format.
 *
 * Dependencies:
 * - Uses financial response interfaces (`IFinResTimeSeries`, etc.).
 * - Outputs mapped data structures (`IFinMapResTimeSeries`, `IFinMapQuote`, etc.).
 */

import type {
  IApiSymbolsResponse,
  IApiLatestRatesResponse,
  IApiHistoricalRatesResponse,
  IApiConvertResponse,
  IApiTimeSeriesResponse,
  IApiFluctuationResponse,
} from '@/api/types/finance/financeResponses'
import type {
  IFinMapCurrencySymbol,
  IFinMapExchangeRate,
  IFinMapConvertedAmount,
  IFinMapExchangeRateSeries,
  IFinMapFluctuationData,
} from '@/api/types/finance/financeResponseMap'

// 1. Symbols
export function mapSymbolsResponse(response: IApiSymbolsResponse): IFinMapCurrencySymbol[] {
  return Object.entries(response.symbols).map(([code, name]) => ({ code, name }))
}

// 2. Latest Rates
export function mapLatestRatesResponse(response: IApiLatestRatesResponse): IFinMapExchangeRate {
  return {
    date: response.date,
    base: response.base,
    rates: response.rates,
  }
}

// 3. Historical Rates
export function mapHistoricalRatesResponse(
  response: IApiHistoricalRatesResponse,
): IFinMapExchangeRate {
  return {
    date: response.date,
    base: response.base,
    rates: response.rates,
  }
}

// 4. Convert Response
export function mapConvertResponse(response: IApiConvertResponse): IFinMapConvertedAmount {
  return {
    from: response.query.from,
    to: response.query.to,
    amount: response.query.amount,
    rate: response.info.rate,
    result: response.result,
    date: response.date,
  }
}

// 5. Time Series
export function mapTimeSeriesResponse(response: IApiTimeSeriesResponse): IFinMapExchangeRateSeries {
  const series = Object.entries(response.rates).map(([date, rates]) => ({
    date,
    rates,
  }))

  return {
    base: response.base,
    series,
  }
}

// 6. Fluctuation
export function mapFluctuationResponse(response: IApiFluctuationResponse): IFinMapFluctuationData {
  const changes = Object.entries(response.rates).map(([currency, data]) => ({
    currency,
    startRate: data.start_rate,
    endRate: data.end_rate,
    change: data.change,
    changePercent: data.change_pct,
  }))

  return {
    base: response.base,
    startDate: response.start_date,
    endDate: response.end_date,
    changes,
  }
}
