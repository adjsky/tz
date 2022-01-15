import { handleRequest } from "./helpers"
import type {
  GetAvailableCurrencies,
  GetMinimalExchangeAmount,
  GetMinimalExchangeAmountProps,
  GetEstimatedExchangeAmount,
  GetEstimatedExchangeAmountProps
} from "./types"

class BackendClient {
  private apiKey = process.env.NEXT_PUBLIC_API_KEY
  private headers = {
    "x-changenow-api-key": this.apiKey ? this.apiKey : ""
  }
  private apiHost = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API}`

  public async getAvailableCurrencies(): Promise<GetAvailableCurrencies> {
    return handleRequest({
      url: `${this.apiHost}/exchange/currencies`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getMinimalExchangeAmount(
    params: GetMinimalExchangeAmountProps
  ): Promise<GetMinimalExchangeAmount> {
    return handleRequest({
      url: `${this.apiHost}/exchange/min-amount`,
      method: "GET",
      headers: this.headers,
      params
    })
  }

  public async getEstimatedExchangeAmount(
    params: GetEstimatedExchangeAmountProps,
    signal: AbortSignal
  ): Promise<GetEstimatedExchangeAmount> {
    return handleRequest({
      url: `${this.apiHost}/exchange/estimated-amount`,
      method: "GET",
      headers: this.headers,
      params,
      signal
    })
  }
}

export default new BackendClient()
