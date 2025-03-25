/**
 * Finance Service (Finance API)
 * -----------------------------------
 * This service interacts with the Finance API to fetch financial data,
 */

import { BaseService } from '@/api/core/BaseService'
import API_CONFIGS from '@/api/config/index'

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

import {
  mapSymbolsResponse,
  mapLatestRatesResponse,
  mapHistoricalRatesResponse,
  mapConvertResponse,
  mapTimeSeriesResponse,
  mapFluctuationResponse,
} from '@/api/mappers/financeResponseMapper'

import {
  mapConvertRequest,
  mapFluctuationRequest,
  mapHistoricalRatesRequest,
  mapLatestRatesRequest,
  mapTimeSeriesRequest,
} from '../mappers/financeRequestMapper'

class FinanceService extends BaseService {
  private apiConfig = API_CONFIGS.CONFIG_FINANCE

  constructor() {
    super(API_CONFIGS.CONFIG_FINANCE.BASE_URL, API_CONFIGS.CONFIG_FINANCE.AXIOS)
  }

  async getSymbols(): Promise<IFinMapCurrencySymbol[]> {
    const response = await this.get<IApiSymbolsResponse>(this.apiConfig.ENDPOINTS.SYMBOLS)
    return mapSymbolsResponse(response)
  }

  async getLatestRates(request?: IFinLatestRatesRequest): Promise<IFinMapExchangeRate> {
    const params = mapLatestRatesRequest(request)
    const response = await this.get<IApiLatestRatesResponse>(this.apiConfig.ENDPOINTS.LATEST, {
      params,
    })
    return mapLatestRatesResponse(response)
  }

  async getHistoricalRates(request: IFinHistoricalRatesRequest): Promise<IFinMapExchangeRate> {
    const mappedParams = mapHistoricalRatesRequest(request)
    const endpoint = `/${mappedParams.date}`
    const params = {
      base: mappedParams.base,
      symbols: mappedParams.symbols,
    }
    const response = await this.get<IApiHistoricalRatesResponse>(endpoint, { params })
    return mapHistoricalRatesResponse(response)
  }

  async convert(request: IFinConvertRequest): Promise<IFinMapConvertedAmount> {
    const params = mapConvertRequest(request)
    const response = await this.get<IApiConvertResponse>(this.apiConfig.ENDPOINTS.CONVERT, {
      params,
    })
    return mapConvertResponse(response)
  }

  async getTimeSeries(request: IFinTimeSeriesRequest): Promise<IFinMapExchangeRateSeries> {
    const params = mapTimeSeriesRequest(request)
    const response = await this.get<IApiTimeSeriesResponse>(this.apiConfig.ENDPOINTS.TIME_SERIES, {
      params,
    })
    return mapTimeSeriesResponse(response)
  }

  async getFluctuations(request: IFinFluctuationRequest): Promise<IFinMapFluctuationData> {
    const params = mapFluctuationRequest(request)
    const response = await this.get<IApiFluctuationResponse>(this.apiConfig.ENDPOINTS.FLUCTUATION, {
      params,
    })
    return mapFluctuationResponse(response)
  }
}

export const financeService = new FinanceService()
