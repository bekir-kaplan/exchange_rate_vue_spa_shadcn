export interface IPropsSearchCombobox {
  value: string
  label: string
}

// Utility function to map data to IPropsSearchCombobox (Uf = Utility Function)
export function UfMapProps<T>(data: T[], map: Record<string, string>): IPropsSearchCombobox[] {
  return data.map((item: any) => ({
    value: item[map.value],
    label: item[map.label],
  }))
}
