<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ConversionView from './conversion/ConversionView.vue'
import HistoricalRates from './historical-rates/HistoricalRates.vue'
import { useHomeStore } from '@/stores/homeStore'

const homeStore = useHomeStore()
const { showHistoricalData } = storeToRefs(homeStore)
</script>

<template>
  <div class="home-view-container">
    <ConversionView />
    <HistoricalRates v-if="showHistoricalData" />
  </div>
</template>

<style scoped>
@import '@/assets/components/views/home-view.css';
</style>
