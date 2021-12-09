import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {
  istablet: boolean
  isDesktop: boolean
}

const initialState: UiState = {
  istablet: false,
  isDesktop: true
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    settablet: (state) => {
      state.istablet = true
      state.isDesktop = false
    },
    setDesktop: (state) => {
      state.isDesktop = true
      state.istablet = false
    }
  }
})

export const { settablet, setDesktop } = uiSlice.actions

export default uiSlice.reducer
