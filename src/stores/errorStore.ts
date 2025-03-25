/**
 * Error Store (Pinia)
 * --------------------------------------
 * Manages application error messages efficiently.
 *
 * Features:
 * - Stores and displays error messages with a timeout.
 * - Prevents duplicate errors using a `Map()`.
 * - Automatically removes errors after a delay.
 */
import { CON_UI_ERROR_DISPLAY_TIME } from '@/constants/conUiConfigs'
import utils from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const errorQueue = ref<{ message: string; errCode: string }[]>([])

  /** Interval controller */
  let errorInterval: ReturnType<typeof setInterval> | null = null

  /**
   * Processes the error queue (FIFO order).
   * Ensures only one `setInterval` is running.
   */
  const processErrorQueue = (): void => {
    if (!errorInterval) {
      errorInterval = setInterval(() => {
        if (errorQueue.value.length > 0) {
          // Show the next error in queue
          errorQueue.value.shift()?.message
        } else {
          // Stop interval when no errors remain
          clearInterval(errorInterval!)
          errorInterval = null
        }
      }, CON_UI_ERROR_DISPLAY_TIME)
    }
  }

  const debounceProcessErrorQueue = utils.debounce(processErrorQueue, 1000)

  /**
   * Adds an error to the queue and starts processing.
   * Prevents duplicate errors using errCode.
   * @param message - The error message.
   * @param errCode - Unique error identifier.
   */
  const setError = (message: string, errCode: string): void => {
    // Prevent duplicate errors
    if (!errorQueue.value.some((err) => err.errCode === errCode)) {
      errorQueue.value.push({ message, errCode })
      debounceProcessErrorQueue()
    }
  }

  // Test: Trigger multiple errors
  // setError('Server error!', '500');
  // setError('Unauthorized access!', '401');
  // setError('Network disconnected!', 'network');
  // setError('Form validation failed!', 'validation');

  /**
   * Clears all errors immediately.
   */
  const clearError = (): void => {
    errorQueue.value = []
    if (errorInterval) {
      clearInterval(errorInterval)
      errorInterval = null
    }
  }

  return {
    errorQueue,
    setError,
    clearError,
  }
})
