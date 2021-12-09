import React from "react"
import { useAppSelector } from "@/src/redux/hooks"

type AddressLabelProps = {
  htmlFor: string
}

function AddressLabel({ htmlFor }: AddressLabelProps) {
  const toCrypto = useAppSelector((state) => state.crypto.toCrypto)

  if (!toCrypto) {
    return null
  }

  return <label htmlFor={htmlFor}>Your {toCrypto.name} address</label>
}

export default AddressLabel
