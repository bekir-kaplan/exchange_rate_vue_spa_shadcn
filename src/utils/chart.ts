import { useHistoricalStore } from '@/stores/historicalStore'

const chart = {
  convertMapDataToChartArray: (
    mapIterator: Iterable<{ date: string; base: string; rates: Record<string, number> }>,
  ) => {
    const historicalStore = useHistoricalStore()
    const chartData: Record<string, any>[] = []

    for (const entry of mapIterator) {
      const { date, rates } = entry

      const row: Record<string, any> = { year: date }

      const selectedEntry = chart.pickKeys(rates, [historicalStore.targetCurrency?.value || 'USD'])

      for (const [currency, value] of Object.entries(selectedEntry)) {
        row[currency] = Number(value.toFixed(2))
      }

      chartData.push(row)
    }

    chartData.sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime())
    return chartData
  },
  pickKeys: (obj: Record<string, any>, keys: string[]) => {
    return keys.reduce((result: Record<string, any>, key: string) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    }, {})
  },
}

export default chart
