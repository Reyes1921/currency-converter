export interface currencyTypes {
  code: string
  name: string
  country: string
}

export interface initialDataCached {
  result: string
  documentation: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
  base_code: string
  conversion_rates: {[key: string]: number}
}

export interface ShowCurrenciesProps {
  value: number
  currencyProp: string
}
