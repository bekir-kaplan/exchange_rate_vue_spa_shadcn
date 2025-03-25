/**
 * API Configuration Module
 * --------------------------
 * This module exports a consolidated API configuration object
 * containing different service configurations such as Finance and others.
 *
 * Modules:
 * - CONFIG_BASE: Configuration settings for the base API.
 * - CONFIG_FINANCE: Configuration settings for the finance API.
 *
 * Usage:
 * Import `API_CONFIG` in other parts of the application to access
 * the respective API configurations dynamically.
 */

import CONFIG_BASE from '@/api/config/baseApiConfig'
import CONFIG_FINANCE from '@/api/config/financeApiConfig'

const API_CONFIG = { CONFIG_BASE, CONFIG_FINANCE }
export default API_CONFIG
