/**
 * HTTP Error Handling
 * ----------------------------------
 * This module defines a custom `HttpError` class and a `handleHttpError`
 * function to manage API request failures in a structured manner.
 *
 * Features:
 * - `HttpError`: Custom error class for HTTP responses.
 * - `handleHttpError`: Centralized error handler for API failures.
 *
 * Dependencies:
 * - `useErrorStore`: Stores error messages globally.
 */
import { useErrorStore } from '@/stores/errorStore'

export class HttpError extends Error {
  public status: number
  public message: string

  /**
   * Constructs an `HttpError` instance.
   * @param {number} status - HTTP status code.
   * @param {string} message - Error message.
   */
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

const apiErrorMessages: Record<number | string, string> = {
  101: 'No API Key was specified or an invalid API Key was specified.',
  102: 'The account this API request is coming from is inactive.',
  103: 'The requested API endpoint does not exist.',
  104: 'The maximum allowed amount of monthly API requests has been reached.',
  105: 'The current subscription plan does not support this API endpoint.',
  106: 'The current request did not return any results.',
  201: 'An invalid base currency has been entered.',
  202: 'One or more invalid symbols have been specified.',
  301: 'No date has been specified.',
  302: 'An invalid date has been specified.',
  403: 'No or an invalid amount has been specified.',
  501: 'No or an invalid timeframe has been specified.',
  502: 'No or an invalid "start_date" has been specified.',
  503: 'No or an invalid "end_date" has been specified.',
  504: 'An invalid timeframe has been specified.',
  505: 'The specified timeframe is too long, exceeding 365 days.',
  function_access_restricted: 'The current subscription plan does not support this API endpoint.',
  base_currency_access_restricted:
    'The current subscription plan does not support this base currency.',
}

/**
 * Handles HTTP errors from API responses.
 * @param {any} error - The error object from an Axios request.
 * @throws {HttpError} - A custom error with status and message.
 */
export function handleHttpError(error: any): void {
  const errorStore = useErrorStore()
  if (error.response) {
    const status = error.response.status
    const data = error.response.data
    const apiCode = data?.error?.code
    const message =
      apiCode && apiErrorMessages[apiCode]
        ? apiErrorMessages[apiCode]
        : data?.error.message || error.message || error.response.statusText || 'Unknown error'

    errorStore.setError(message, apiCode || status)

    if (apiCode && apiErrorMessages[apiCode]) {
      throw new HttpError(apiCode, message)
    }
  } else if (error.request) {
    const errorMessage = 'No response received from server'
    errorStore.setError(errorMessage, 'no_response')
    throw new HttpError(0, errorMessage)
  } else {
    const errorMessage = `Error in request setup: ${error}`
    errorStore.setError(errorMessage, 'err_in_request')
    throw new HttpError(0, `Error in request setup: ${errorMessage}`)
  }
}
