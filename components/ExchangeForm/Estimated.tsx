import React from "react"
import InputSelect from "../InputSelect"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import {
  setToCrypto,
  updateMinimalExchangeAmount
} from "@/src/redux/cryptoSlice"
import type { Currency } from "@/src/BackendClient/types"

type EstimatedProps = {
  options?: Currency[]
  reachedMinimal: boolean
}

function Estimated({ options, reachedMinimal }: EstimatedProps) {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.crypto.estimatedExchangeStatus)
  const toCrypto = useAppSelector((state) => state.crypto.toCrypto)
  const estimatedExchangeAmount = useAppSelector(
    (state) => state.crypto.estimatedExchangeAmount
  )
  let inputValue = estimatedExchangeAmount
    ? estimatedExchangeAmount.toString()
    : ""
  if (reachedMinimal) {
    inputValue = ""
  }

  const onToCryptoChange = (selected: Currency) => {
    dispatch(setToCrypto(selected))
    dispatch(updateMinimalExchangeAmount())
  }

  return (
    <InputSelect
      selectedName={toCrypto && toCrypto.name}
      options={options}
      value={
        status != "pending"
          ? inputValue
          : "Fetching..."
      }
      onChange={() => {}}
      onSelectChange={onToCryptoChange}
      hasError={reachedMinimal}
      disabled
    />
  )
}

export default Estimated
