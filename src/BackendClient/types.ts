export type Currency = {
  ticker: string
  name: string
  image: string
  hasExternalId: boolean
  isFiat: boolean
  featured: boolean
  isStable: boolean
  supportsFixedRate: boolean
  network: string
  tokenContract: string
  buy: boolean
  sell: boolean
}

export type GetAvailableCurrencies = {
  status?: number
  message: string
  data?: Currency[]
}

export type GetMinimalExchangeAmountProps = {
  fromCurrency: string
  toCurrency: string
  toNetwork: string
  fromNetwork: string
}

export type GetMinimalExchangeAmount = {
  status?: number
  message: string
  data?: {
    minAmount: number
  }
}

export type GetEstimatedExchangeAmount = {
  status?: number
  message: string
  data?: {
    toAmount: number
  }
}

export type GetEstimatedExchangeAmountProps = GetMinimalExchangeAmountProps & {
  fromAmount: number
}
