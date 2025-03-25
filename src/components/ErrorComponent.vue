<!--
  ErrorComponent.vue
  --------------------
  This component displays error messages fetched from the error store.
  It allows closing errors and also supports a custom error message.

  Props:
    - title (string, optional): Custom title for the error message.
    - customError (string, optional): Allows passing a manually defined error message.
    - class (string, optional): Additional CSS classes for styling.

  Dependencies:
    - Pinia Store:
      - useErrorStore: Manages error messages and provides a method to clear them.
    - Heroicons:
      - XCircleIcon: Used as a close button icon.

  Computed Properties:
    - storeErrors: Retrieves error messages from the Pinia error store.

  Behavior:
    - If `storeErrors` or `customError` exists, the error message is displayed.
    - Clicking the close button calls `errorStore.clearError` to remove the error messages.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`error-component.css`) for styling.
-->
<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const errorStore = useErrorStore()

const props = defineProps<{
  title?: string
  customError?: string
  class?: string
}>()

const storeErrors = computed(() => errorStore.errorQueue)
</script>

<template>
  <div v-if="storeErrors?.length || props.customError">
    <div class="error-container" :class="[props.class]">
      <button @click="errorStore.clearError" class="error-close-button">
        <XCircleIcon class="error-close-icon" />
      </button>
      <div v-for="(err, idx) in storeErrors" :key="idx">
        <p class="error-title">{{ props.title || 'Error' }}</p>
        <p class="error-message">{{ err.message || props.customError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/components/error-component.css';
</style>
