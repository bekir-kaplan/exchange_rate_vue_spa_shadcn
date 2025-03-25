<script setup lang="ts">
import SearchCombobox from '@/components/SearchCombobox.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useSymbolsStore } from '@/stores/symbolsStore'
import { ref, computed, toRef } from 'vue'
import { storeToRefs } from 'pinia'
import type { IPropsSearchCombobox } from '@/types/components.types'
import { useLatestStore } from '@/stores/latestStore'
import { ArrowLeftRightIcon } from 'lucide-vue-next'
import { useHomeStore } from '@/stores/homeStore'

const symbolsStore = useSymbolsStore()
const latestStore = useLatestStore()
const homeStore = useHomeStore()
const showCalculations = ref(false)
const { symbols, loading: symbolLoading, error: symbolError } = storeToRefs(symbolsStore)
const { latestRates, loading: latestLoading, error: latestError } = storeToRefs(latestStore)

const amount = ref<number | string>('')
const baseCurrency = ref<IPropsSearchCombobox>()
const targetCurrency = ref<IPropsSearchCombobox>()
const convertedAmount = ref<number | null>(null)

const canConvert = computed(() => {
  homeStore.setBaseCurrency(baseCurrency.value)
  homeStore.setTargetCurrency(targetCurrency.value)
  homeStore.setShowHistoricalData(false)
  showCalculations.value = false

  return (
    amount.value &&
    baseCurrency.value &&
    targetCurrency.value &&
    baseCurrency.value !== targetCurrency.value
  )
})

const convertCurrency = async () => {
  if (!canConvert.value) return
  await latestStore.fetchLatestRates({
    base: baseCurrency.value?.value || '',
  })

  if (!latestError.value) {
    if (latestRates.value?.rates) {
      Object.keys(latestRates.value.rates).forEach((rate) => {
        if (rate === targetCurrency.value?.value) {
          convertedAmount.value = Number(amount.value) * (latestRates.value?.rates[rate] ?? 0)
        }
      })
    }
    showCalculations.value = true
    homeStore.setShowHistoricalData(true)
  } else {
    showCalculations.value = false
    homeStore.setShowHistoricalData(false)
  }
}

const handleSwitchClick = () => {
  const temp = baseCurrency.value
  baseCurrency.value = targetCurrency.value
  targetCurrency.value = temp
  convertCurrency()
}
</script>

<template>
  <Card class="card-view-container">
    <CardHeader>
      <h1 class="card-view-title">Currency Exchange</h1>
    </CardHeader>
    <CardContent class="card-view-content">
      <!-- Amount Input -->
      <div>
        <label class="conversion-view-label">Amount</label>
        <Input v-model="amount" type="number" placeholder="Enter amount" />
      </div>

      <div class="conversion-view-error" v-if="symbolError">
        <p>Error: {{ symbolError }}</p>
      </div>
      <div v-else class="conversion-view-currency-container">
        <!-- Base Currency -->
        <div class="conversion-view-loading" v-if="symbolLoading">
          <p>Loading...</p>
        </div>
        <div v-else>
          <label class="conversion-view-label">Base Currency</label>
          <SearchCombobox
            class-name="min-w-[10rem]"
            v-model="baseCurrency"
            :data="symbols"
            :map="{ value: 'code', label: 'name' }"
          />
        </div>

        <!-- Target Currency -->
        <div class="conversion-view-loading" v-if="symbolLoading">
          <p>Loading...</p>
        </div>
        <div v-else>
          <label class="conversion-view-label">Target Currency</label>
          <SearchCombobox
            class-name="min-w-[10rem]"
            v-model="targetCurrency"
            :data="symbols"
            :map="{ value: 'code', label: 'name' }"
          />
        </div>
      </div>

      <!-- Convert Button -->
      <Button class="conversion-view-convert-btn" @click="convertCurrency" :disabled="!canConvert">
        Convert
      </Button>

      <!-- Result -->
      <div class="conversion-view-loading" v-if="latestLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="showCalculations" class="conversion-view-result">
        <p class="conversion-view-result-text">
          {{ amount }} {{ baseCurrency?.value }} =
          <span class="conversion-view-result-value">{{ convertedAmount }}</span>
          {{ targetCurrency?.value }}
        </p>
        <Button @click="handleSwitchClick">
          <ArrowLeftRightIcon />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
@import '@/assets/views/conversion-view.css';
</style>
