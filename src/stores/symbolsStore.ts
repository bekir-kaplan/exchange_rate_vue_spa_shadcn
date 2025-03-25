/**
 * Finance Store (Pinia)
 * --------------------------------------
 * Manages financial market data
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { financeService } from '@/api/services/FinanceService'
import type { IFinMapCurrencySymbol } from '@/api/types/finance/financeResponseMap'

export const useSymbolsStore = defineStore('symbolsStore', () => {
  const symbols = ref<IFinMapCurrencySymbol[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchSymbols = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await financeService.getSymbols()
      if (result) symbols.value = result
    } finally {
      loading.value = false
    }
  }

  return {
    symbols,
    loading,
    error,
    fetchSymbols,
  }
})
