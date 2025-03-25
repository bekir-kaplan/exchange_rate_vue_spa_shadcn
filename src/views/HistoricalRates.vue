<script setup lang="ts">
import { computed, ref, type Ref, watch } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHistoricalStore } from '@/stores/historicalStore'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/homeStore'
import LineChart from '@/components/ui/chart-line/LineChart.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import type { DateRange } from 'reka-ui'

const homeStore = useHomeStore()
const historicalStore = useHistoricalStore()
const { targetCurrency, historicalRates } = storeToRefs(historicalStore)
const { showHistoricalData } = storeToRefs(homeStore)

const endDate = new Date()
const dateRange = ref({
  start: new CalendarDate(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).add({
    days: -2,
  }),
  end: new CalendarDate(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
}) as Ref<DateRange>

const categories = computed(() => {
  if (targetCurrency.value) {
    return [`${targetCurrency.value?.value}`]
  }
  return []
})

const lineChartKey = ref(0)

const refreshLineChart = () => {
  lineChartKey.value += 1
}

watch(
  dateRange,
  async (newRange) => {
    if (showHistoricalData && newRange.start && newRange.end) {
      await historicalStore.fetchHistoricalRatesByDateRange(
        new CalendarDate(newRange.start.year, newRange.start.month, newRange.start.day),
        new CalendarDate(newRange.end.year, newRange.end.month, newRange.end.day),
      )
      refreshLineChart()
    }
  },
  { immediate: true },
)

watch(
  categories,
  () => {
    refreshLineChart()
  },
  { immediate: true },
)
</script>

<template>
  <Card class="card-view-container">
    <CardHeader>
      <h2 class="card-view-title">Historical Rates</h2>
    </CardHeader>
    <CardContent class="card-view-content">
      <DateRangePicker v-model="dateRange" />
      <LineChart
        :key="lineChartKey"
        v-if="categories.length"
        :data="historicalRates"
        index="year"
        :categories="categories"
      />
    </CardContent>
  </Card>
</template>
