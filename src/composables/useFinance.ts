import { ref } from 'vue'
import { financeService } from '@/api/services/FinanceService'

import type {
  IFinMapCurrencySymbol,
  IFinMapExchangeRate,
  IFinMapExchangeRateSeries,
  IFinMapConvertedAmount,
  IFinMapFluctuationData,
} from '@/api/types/finance/financeResponseMap'

import type {
  IFinLatestRatesRequest,
  IFinHistoricalRatesRequest,
  IFinConvertRequest,
  IFinTimeSeriesRequest,
  IFinFluctuationRequest,
} from '@/api/types/finance/financeRequests'

export function useFinance() {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function wrapRequest<T>(fn: () => Promise<T>): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      const result = await fn()
      return result
    } catch (err) {
      error.value = err as Error
      return null
    } finally {
      loading.value = false
    }
  }

  const getSymbols = () => wrapRequest<IFinMapCurrencySymbol[]>(() => financeService.getSymbols())

  const getLatestRates = (request?: IFinLatestRatesRequest) =>
    wrapRequest<IFinMapExchangeRate>(() => financeService.getLatestRates(request))

  const getHistoricalRates = (request: IFinHistoricalRatesRequest) =>
    wrapRequest<IFinMapExchangeRate>(() => financeService.getHistoricalRates(request))

  const convert = (request: IFinConvertRequest) =>
    wrapRequest<IFinMapConvertedAmount>(() => financeService.convert(request))

  const getTimeSeries = (request: IFinTimeSeriesRequest) =>
    wrapRequest<IFinMapExchangeRateSeries>(() => financeService.getTimeSeries(request))

  const getFluctuations = (request: IFinFluctuationRequest) =>
    wrapRequest<IFinMapFluctuationData>(() => financeService.getFluctuations(request))

  return {
    loading,
    error,
    getSymbols,
    getLatestRates,
    getHistoricalRates,
    convert,
    getTimeSeries,
    getFluctuations,
  }
}
