import React from "react"
import styled from "styled-components"
import { tablet } from "@/src/constants"
import { FaExchangeAlt } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import {
  setToCrypto,
  setFromCrypto,
  updateMinimalExchangeAmount,
  updateEstimatedExchangeAmount
} from "@/src/redux/cryptoSlice"

const Button = styled.button.attrs({
  type: "button"
})`
  font-size: 1rem;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;

  & > svg {
    color: var(--brand);
    font-size: 0.9em;
  }

  @media only screen and (max-width: ${tablet}px) {
    transform: rotate(90deg);
  }
`

function Swap() {
  const dispatch = useAppDispatch()
  const toCrypto = useAppSelector((state) => state.crypto.toCrypto)
  const fromCrypto = useAppSelector((state) => state.crypto.fromCrypto)

  const handleClick = () => {
    if (toCrypto && fromCrypto) {
      const temp = toCrypto
      dispatch(setToCrypto(fromCrypto))
      dispatch(setFromCrypto(temp))
      dispatch(updateMinimalExchangeAmount())
    }
  }

  return (
    <Button onClick={handleClick}>
      <FaExchangeAlt />
    </Button>
  )
}

export default Swap
