<script setup lang="ts">
import ErrorComponent from './components/ErrorComponent.vue'
</script>

<template>
  <main class="app-main-container">
    <ErrorComponent />
    <RouterView />
  </main>
</template>
