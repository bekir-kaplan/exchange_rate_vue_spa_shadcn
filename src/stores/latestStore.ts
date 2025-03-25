/**
 * Finance Store (Pinia)
 * --------------------------------------
 * Manages financial market data
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFinance } from '@/composables/useFinance'
import type { IFinLatestRatesRequest } from '@/api/types/finance/financeRequests'
import type { IFinMapExchangeRate } from '@/api/types/finance/financeResponseMap'

export const useLatestStore = defineStore('latestStore', () => {
  const financeComposable = useFinance()
  const { loading, error } = financeComposable
  const latestRates = ref<IFinMapExchangeRate>()

  const fetchLatestRates = async (params?: IFinLatestRatesRequest) => {
    const result = await financeComposable.getLatestRates(params)
    if (result) latestRates.value = result
  }

  return {
    loading,
    error,
    latestRates,
    fetchLatestRates,
  }
})
