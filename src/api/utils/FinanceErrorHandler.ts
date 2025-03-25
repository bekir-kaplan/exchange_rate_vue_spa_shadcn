/**
 * Financial API Response Error Handler
 * --------------------------------------
 * This function checks the response from the financial API
 * and triggers an HTTP error if the response contains an error code.
 *
 * Features:
 * - Extracts error status from the API response.
 * - Calls `handleHttpError` to handle errors consistently.
 * - Returns the original response if no error is found.
 *
 * Dependencies:
 * - `handleHttpError`: Handles API errors globally.
 */
import { handleHttpError } from '@/api/utils/ErrorHandler';

/**
 * Validates the financial API response and throws an error if necessary.
 * @param {any} apiResponse - The raw response from the financial API.
 * @returns {any} - The original response if valid.
 * @throws {HttpError} - If the response contains an error code.
 */
export function checkErrorInFinanceApiResponse(apiResponse: any): any {
  if (apiResponse.code && apiResponse.code !== 200) {
    handleHttpError({
      response: {
        status: apiResponse.code,
        statusText: apiResponse.status || 'Unknown Error',
        data: {
          message: apiResponse.message || 'An unknown error occurred in the Finance API',
        },
      },
    });
  }

  return apiResponse;
}
