/**
 * Finance Store (Pinia)
 * --------------------------------------
 * Manages financial market data
 */
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { financeService } from '@/api/services/FinanceService'
import { CalendarDate } from '@internationalized/date'
import type { IDateString, IFinHistoricalRatesRequest } from '@/api/types/finance/financeRequests'
import type { IFinMapExchangeRate } from '@/api/types/finance/financeResponseMap'
import utils from '@/utils'
import { useHomeStore } from './homeStore'

export const useHistoricalStore = defineStore('historicalStore', () => {
  const homeStore = useHomeStore()
  const baseCurrency = computed(() => homeStore.baseCurrency)
  const targetCurrency = computed(() => homeStore.targetCurrency)
  const historicalRates = ref<Record<string, any>[]>([])
  const chartCategories = ref<string[]>([])
  const historicalRatesMap = ref(new Map<string, IFinMapExchangeRate>())
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const setHistoricalRates = () => {
    historicalRates.value =
      utils.convertMapDataToChartArray(historicalRatesMap.value.values()) || []
    const categoriesArr = historicalRatesMap.value.values().next().value?.rates
    const findSelectedKey = Object.keys(categoriesArr || []).find(
      (a) => a === targetCurrency?.value?.value,
    )
    chartCategories.value = [findSelectedKey || 'USD']
  }

  const fetchHistoricalRates = async (params: IFinHistoricalRatesRequest) => {
    loading.value = true
    error.value = null
    try {
      const result = await financeService.getHistoricalRates(params)
      if (result) {
        historicalRatesMap.value.set(params.date, result)
      }
    } finally {
      setHistoricalRates()
      loading.value = false
    }
  }

  const fetchHistoricalRatesByDateRange = async (start: CalendarDate, end: CalendarDate) => {
    const dates: IDateString[] = []
    let currentDate = start
    while (currentDate.compare(end) <= 0) {
      const dateString = utils.formatDateToYYYYMMDD(currentDate) as IDateString

      dates.push(dateString)
      currentDate = currentDate.add({ days: 1 })
    }

    const promises = dates.map((date) =>
      fetchHistoricalRates({
        date: date,
        base: 'EUR',
      }),
    )
    await Promise.all(promises)
  }

  return {
    targetCurrency,
    baseCurrency,
    historicalRates,
    chartCategories,
    loading,
    error,
    fetchHistoricalRates,
    fetchHistoricalRatesByDateRange,
  }
})
