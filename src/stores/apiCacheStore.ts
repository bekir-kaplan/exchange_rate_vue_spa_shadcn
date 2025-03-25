/**
 * API Cache Store (Pinia)
 * --------------------------------------
 * Caches API responses to reduce redundant requests and improve performance.
 *
 * Features:
 * - Stores API responses with timestamps.
 * - Provides cache retrieval with expiration time.
 */
import API_CONFIG from '@/api/config'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ISotoreCachedResponse } from '@/types/stores.types'

export const useApiCacheStore = defineStore('apiCache', () => {
  const cache = ref<Record<string, ISotoreCachedResponse>>({})

  /**
   * Retrieves a cached response if it is still valid.
   * @param key - Unique cache key.
   * @param maxAge - Maximum cache age in milliseconds (default: 1 hour).
   * @returns The cached data or `null` if expired/missing.
   */
  const getCache = (
    key: string,
    maxAge = API_CONFIG.CONFIG_BASE.API_DEFAULTS.CACHE_TIME,
  ): ISotoreCachedResponse | null => {
    // Default 1 hour cache
    const cached = cache.value[key]
    if (cached && Date.now() - cached.timestamp < maxAge) {
      return cached.data
    }
    return null
  }

  /**
   * Stores a new response in the cache.
   * @param key - Unique cache key.
   * @param data - The response data to cache.
   */
  const setCache = (key: string, data: any): void => {
    cache.value[key] = { data, timestamp: Date.now() }
  }

  return { cache, getCache, setCache }
})
