/**
 * Base Service Class
 * -------------------------
 * This abstract class provides a foundation for API service classes,
 * handling HTTP requests, caching, and error management.
 *
 * Features:
 * - Axios-based HTTP request handling.
 * - Response interceptors for centralized error handling.
 * - Optional caching for GET requests using a Pinia store.
 * - API-specific error handling for Finance.
 *
 * Dependencies:
 * - `axios`: Handles HTTP requests.
 * - `useApiCacheStore`: Provides caching for GET requests.
 * - `handleHttpError`: Handles HTTP errors globally.
 * - `checkErrorInFinanceApiResponse`: Validates responses from the Finance API.
 * - `API_CONFIG`: Contains API configuration details.
 *
 * Usage:
 * Extend this class in API service classes and use `this.get<T>(url, config)`.
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { useApiCacheStore } from '@/stores/apiCacheStore' // Import the cache store
import { handleHttpError } from '@/api/utils/ErrorHandler'
import { checkErrorInFinanceApiResponse } from '@/api/utils/FinanceErrorHandler'
import API_CONFIG from '@/api/config'

export abstract class BaseService {
  protected readonly instance: AxiosInstance

  /**
   * Initializes the API service with a base URL and optional configuration.
   * @param {string} baseURL - The API base URL.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios request configurations.
   */
  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ baseURL, ...config })
    this._initializeResponseInterceptor()
  }

  /**
   * Sets up response interceptors for handling responses and errors globally.
   * Uses a success handler for extracting data and an error handler for handling failures.
   */
  private _initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(this._handleResponse, handleHttpError)
  }

  /**
   * Extracts the `data` property from API responses.
   * @param {AxiosResponse} response - The HTTP response object.
   * @returns {any} - The extracted data from the response.
   */
  private _handleResponse = ({ data }: AxiosResponse): any => data

  /**
   * Performs a GET request with optional caching.
   * @param {string} url - The API endpoint to request.
   * @param {AxiosRequestConfig} [config] - Additional Axios request configurations.
   * @param {number} [cacheTime=3600000] - Cache expiry time in milliseconds (default: 1 hour).
   * @param {boolean} [useCache=true] - Whether to use caching (default: true).
   * @returns {Promise<T>} - A promise resolving to the API response data.
   */
  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    cacheTime = API_CONFIG.CONFIG_BASE.API_DEFAULTS.CACHE_TIME, // Default cache expiry: 1 hour
    useCache = API_CONFIG.CONFIG_BASE.API_DEFAULTS.USE_CACHE, // Default using cache
  ): Promise<T> {
    // Use pinia persisted store to store cache in local storage
    const cacheStore = useApiCacheStore()

    if (useCache) {
      const cacheKey = this._getCacheKey(url, config)
      const cachedData = this._getCachedData<T>(cacheStore, cacheKey, cacheTime)
      if (cachedData) {
        return cachedData
      }
    }

    const response = await this.instance.get<T, T>(url, config)

    // Handle API-specific errors
    this._validateApiResponse(response)

    // Store response in cache if caching is enabled
    if (useCache) {
      const cacheKey = this._getCacheKey(url, config)
      this._storeInCache(cacheStore, cacheKey, response)
    }

    return response
  }

  /**
   * Generates a cache key based on the URL and request parameters.
   * @param {string} url - The API endpoint URL.
   * @param {AxiosRequestConfig} [config] - Additional request configuration.
   * @returns {string} - The generated cache key.
   */
  private _getCacheKey(url: string, config?: AxiosRequestConfig): string {
    const queryString = config?.params ? JSON.stringify(config.params) : ''
    return `${url}?${queryString}`
  }

  /**
   * Retrieves cached data if available and not expired.
   * @param {ReturnType<typeof useApiCacheStore>} cacheStore - The Pinia cache store instance.
   * @param {string} cacheKey - The cache key.
   * @param {number} cacheTime - The cache expiry time in milliseconds.
   * @returns {T | null} - The cached data if available, otherwise null.
   */
  private _getCachedData<T>(
    cacheStore: ReturnType<typeof useApiCacheStore>,
    cacheKey: string,
    cacheTime: number,
  ): T | null {
    return cacheStore.getCache(cacheKey, cacheTime) as T | null
  }

  /**
   * Stores data in the cache with a specific key.
   * @param {ReturnType<typeof useApiCacheStore>} cacheStore - The Pinia cache store instance.
   * @param {string} cacheKey - The cache key.
   * @param {T} data - The data to store in the cache.
   */
  private _storeInCache<T>(
    cacheStore: ReturnType<typeof useApiCacheStore>,
    cacheKey: string,
    data: T,
  ): void {
    cacheStore.setCache(cacheKey, data)
  }

  /**
   * Validates API responses based on the source (Finance).
   * @param {any} response - The API response data.
   */
  private _validateApiResponse(response: any): void {
    const requestUrl = this.instance.getUri()

    if (requestUrl.includes(API_CONFIG.CONFIG_FINANCE.BASE_URL)) {
      checkErrorInFinanceApiResponse(response)
    }
  }
}
