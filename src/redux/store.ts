import { configureStore } from "@reduxjs/toolkit"
import uiSlice from "./uiSlice"
import cryptoSlice from "./cryptoSlice"

const store = configureStore({
  reducer: {
    ui: uiSlice,
    crypto: cryptoSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
