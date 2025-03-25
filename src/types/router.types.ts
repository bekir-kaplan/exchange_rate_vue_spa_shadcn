export type TPRoutePath =
  | 'latestRates'
  | 'conversion'
  | 'historicalRates'
  | 'timeSeries'
  | 'fluctuationData'

export type TPRouteUrl = `/${TPRoutePath}`

export interface INRoutePath {
  url: TPRouteUrl
  name: TPRoutePath
  label: string
}
