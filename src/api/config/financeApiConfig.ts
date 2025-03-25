/**
 * Finance API Configuration (Data)
 * ----------------------------------------
 * This module provides configuration settings for the Data API,
 * including Axios request options, API endpoints, and the base URL.
 *
 * Configuration Includes:
 * - `AXIOS`: Default Axios request configuration (headers, params, timeout).
 * - `ENDPOINTS`: API endpoint paths for different financial data queries.
 * - `BASE_URL`: The base URL for Data API.
 * - `REQUEST_DEFAULTS`: Default values for API requests.
 *
 * Usage:
 * Import `CONFIG_FINANCE` wherever financial API requests need to be made.
 */

import type { AxiosRequestConfig } from 'axios'

// Finance Api Config
const FINANCE_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    access_key: import.meta.env.VITE_FINANCE_API_KEY,
  },
  timeout: 10000,
}

const FINANCE_ENDPOINTS = {
  HISTORICAL: '/',
  SYMBOLS: '/symbols',
  LATEST: '/latest',
  CONVERT: '/convert',
  TIME_SERIES: '/timeseries',
  FLUCTUATION: '/fluctuation',
} as const

const FINANCE_BASE_URL = import.meta.env.VITE_FINANCE_BASE_URL

const CONFIG_FINANCE = {
  AXIOS: FINANCE_CONFIG,
  ENDPOINTS: FINANCE_ENDPOINTS,
  BASE_URL: FINANCE_BASE_URL,
}

export default CONFIG_FINANCE
