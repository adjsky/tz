import React, { useEffect, useState } from "react"
import InputSelect from "../InputSelect"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import {
  setFromCrypto,
  updateMinimalExchangeAmount,
  updateEstimatedExchangeAmount
} from "@/src/redux/cryptoSlice"
import type { Currency } from "@/src/BackendClient/types"

type AmountProps = {
  options?: Currency[]
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: () => void
  onValueSet: (value: string) => void
  setReachedMinimal: (condition: boolean) => void
}

let pendingRequest: any = null

function Amount({
  options,
  onValueSet,
  value,
  onChange,
  onBlur,
  setReachedMinimal
}: AmountProps) {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.crypto.minimalExchangeStatus)
  const fromCrypto = useAppSelector((state) => state.crypto.fromCrypto)
  const [userEntered, setUserEntered] = useState(false)
  const minimalExchangeAmount = useAppSelector(
    (state) => state.crypto.minimalExchangeAmount
  )

  const updateEstimated = (value: number) => {
    const promise = dispatch(updateEstimatedExchangeAmount(value))
    if (!pendingRequest) {
      pendingRequest = promise
    } else {
      pendingRequest.abort()
      pendingRequest = promise
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserEntered(true)
    if (minimalExchangeAmount) {
      const value = event.target.value
      const numberValue = Number(value)
      if (numberValue < minimalExchangeAmount) {
        setReachedMinimal(true)
      } else {
        setReachedMinimal(false)
        updateEstimated(numberValue)
      }
    }
    onChange(event)
  }

  const onFromCryptoChange = (selected: Currency) => {
    dispatch(setFromCrypto(selected))
    dispatch(updateMinimalExchangeAmount())
  }

  useEffect(() => {
    setReachedMinimal(false)

    if (status == "error") {
      onValueSet("")
    }

    if (status == "idle") {
      if (!userEntered || value == "") {
        if (value == "") {
          setUserEntered(false)
        }
        onValueSet(
          minimalExchangeAmount ? minimalExchangeAmount.toString() : ""
        )
        dispatch(updateEstimatedExchangeAmount(minimalExchangeAmount))
      } else {
        dispatch(updateEstimatedExchangeAmount(Number(value)))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimalExchangeAmount, status])

  return (
    <InputSelect
      selectedName={fromCrypto && fromCrypto.name}
      options={options}
      autoComplete="off"
      onSelectChange={onFromCryptoChange}
      onlyNumber
      onChange={handleChange}
      value={
        userEntered && value != ""
          ? value
          : status != "pending"
          ? value
          : "Fetching..."
      }
      onBlur={onBlur}
    />
  )
}

export default Amount
