/**
 * Finance Store (Pinia)
 * --------------------------------------
 * Manages financial market data
 */
import type { IPropsSearchCombobox } from '@/types/components.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore('homeStore', () => {
  const baseCurrency = ref<IPropsSearchCombobox>()
  const targetCurrency = ref<IPropsSearchCombobox>()
  const showHistoricalData = ref(false)

  const setBaseCurrency = (currency?: IPropsSearchCombobox) => {
    baseCurrency.value = currency
  }

  const setTargetCurrency = (currency?: IPropsSearchCombobox) => {
    targetCurrency.value = currency
  }

  const setShowHistoricalData = (show: boolean) => {
    showHistoricalData.value = show
  }

  return {
    baseCurrency,
    targetCurrency,
    showHistoricalData,
    setShowHistoricalData,
    setBaseCurrency,
    setTargetCurrency,
  }
})
