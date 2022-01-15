import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import BackendClient from "../BackendClient"
import type {
  GetMinimalExchangeAmount,
  GetEstimatedExchangeAmount
} from "../BackendClient/types"
import type { RootState } from "./store"
import type { Currency } from "@/src/BackendClient/types"

type Status = "pending" | "idle" | "error"

export type CryptoState = {
  errorMessage: string | null
  fromCrypto: Currency | null
  toCrypto: Currency | null
  minimalExchangeStatus: Status
  minimalExchangeAmount: number | null
  estimatedExchangeStatus: Status
  estimatedExchangeAmount: number | null
}

const initialState: CryptoState = {
  estimatedExchangeStatus: "idle",
  minimalExchangeStatus: "pending",
  fromCrypto: null,
  toCrypto: null,
  minimalExchangeAmount: null,
  errorMessage: null,
  estimatedExchangeAmount: null
}

export const updateMinimalExchangeAmount = createAsyncThunk<
  GetMinimalExchangeAmount | null,
  void,
  {
    state: RootState
  }
>("crypto/updateMinimalExchangeAmount", async (_, { getState }) => {
  const state = getState()
  const toCrypto = state.crypto.toCrypto
  const fromCrypto = state.crypto.fromCrypto
  if (toCrypto && fromCrypto) {
    const response = await BackendClient.getMinimalExchangeAmount({
      fromCurrency: fromCrypto.ticker,
      toCurrency: toCrypto.ticker,
      fromNetwork: fromCrypto.network,
      toNetwork: toCrypto.network
    })

    return response
  }

  return null
})

export const updateEstimatedExchangeAmount = createAsyncThunk<
  GetEstimatedExchangeAmount | null,
  number | null,
  {
    state: RootState
  }
>(
  "crypto/updateEstimatedExchangeAmount",
  async (fromAmount, { getState, signal }) => {
    const state = getState()
    const toCrypto = state.crypto.toCrypto
    const fromCrypto = state.crypto.fromCrypto
    if (toCrypto && fromCrypto && fromAmount) {
      const response = await BackendClient.getEstimatedExchangeAmount(
        {
          fromCurrency: fromCrypto.ticker,
          toCurrency: toCrypto.ticker,
          fromNetwork: fromCrypto.network,
          toNetwork: toCrypto.network,
          fromAmount
        },
        signal
      )

      return response
    }

    return null
  }
)

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setToCrypto: (state, action: PayloadAction<Currency>) => {
      state.toCrypto = action.payload
    },
    setFromCrypto: (state, action: PayloadAction<Currency>) => {
      state.fromCrypto = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateMinimalExchangeAmount.pending, (state) => {
      state.minimalExchangeStatus = "pending"
      state.errorMessage = null
    })
    builder.addCase(
      updateMinimalExchangeAmount.fulfilled,
      (state, action: PayloadAction<GetMinimalExchangeAmount | null>) => {
        if (action.payload) {
          if (action.payload.data) {
            state.minimalExchangeAmount = action.payload.data.minAmount
            state.minimalExchangeStatus = "idle"
          } else {
            state.minimalExchangeAmount = null
            state.estimatedExchangeAmount = null
            state.minimalExchangeStatus = "error"
            state.errorMessage = "This pair is disabled now"
          }
        } else {
          state.minimalExchangeAmount = null
        }
      }
    )
    builder.addCase(updateEstimatedExchangeAmount.pending, (state) => {
      state.estimatedExchangeStatus = "pending"
      state.errorMessage = null
    })
    builder.addCase(
      updateEstimatedExchangeAmount.fulfilled,
      (state, action: PayloadAction<GetEstimatedExchangeAmount | null>) => {
        if (action.payload) {
          if (action.payload.data) {
            state.estimatedExchangeAmount = action.payload.data.toAmount
            state.estimatedExchangeStatus = "idle"
          } else {
            state.minimalExchangeAmount = null
            state.estimatedExchangeAmount = null
            state.estimatedExchangeStatus = "error"
            state.errorMessage = "This pair is disabled now"
          }
        } else {
          state.estimatedExchangeAmount = null
        }
      }
    )
  }
})

export const { setToCrypto, setFromCrypto } = cryptoSlice.actions

export default cryptoSlice.reducer
