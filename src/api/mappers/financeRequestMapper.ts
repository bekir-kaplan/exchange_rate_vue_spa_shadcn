import type {
  IFinMapConvertRequest,
  IFinMapFluctuationRequest,
  IFinMapHistoricalRatesRequest,
  IFinMapLatestRatesRequest,
  IFinMapTimeSeriesRequest,
} from '../types/finance/financeRequestMap'
import type {
  IFinConvertRequest,
  IFinFluctuationRequest,
  IFinHistoricalRatesRequest,
  IFinLatestRatesRequest,
  IFinTimeSeriesRequest,
} from '../types/finance/financeRequests'

export const mapLatestRatesRequest = (
  request?: IFinLatestRatesRequest,
): IFinMapLatestRatesRequest | null => {
  if (!request) return { base: '', symbols: '' }

  return {
    base: request.base || '',
    symbols: request.symbols?.join(','),
  }
}

export const mapHistoricalRatesRequest = (
  request: IFinHistoricalRatesRequest,
): IFinMapHistoricalRatesRequest => {
  return {
    date: request.date,
    base: request.base,
    symbols: request.symbols?.join(','),
  }
}

export const mapConvertRequest = (request: IFinConvertRequest): IFinMapConvertRequest => {
  return {
    from: request.from,
    to: request.to,
    amount: request.amount,
  }
}

export const mapTimeSeriesRequest = (request: IFinTimeSeriesRequest): IFinMapTimeSeriesRequest => {
  return {
    start_date: request.startDate,
    end_date: request.endDate,
    base: request.base,
    symbols: request.symbols?.join(','),
  }
}

export const mapFluctuationRequest = (
  request: IFinFluctuationRequest,
): IFinMapFluctuationRequest => {
  return {
    start_date: request.startDate,
    end_date: request.endDate,
    base: request.base,
    symbols: request.symbols?.join(','),
  }
}
