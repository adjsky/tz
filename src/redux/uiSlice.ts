import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {
  isTablet: boolean
  isDesktop: boolean
}

const initialState: UiState = {
  isTablet: false,
  isDesktop: true
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTablet: (state) => {
      state.isTablet = true
      state.isDesktop = false
    },
    setDesktop: (state) => {
      state.isDesktop = true
      state.isTablet = false
    }
  }
})

export const { setTablet, setDesktop } = uiSlice.actions

export default uiSlice.reducer
