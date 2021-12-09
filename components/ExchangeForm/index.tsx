import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { tablet } from "@/src/constants"
import Input from "@/components/Input"
import Headers from "./Headers"
import InputRow from "./InputRow"
import AddressRow from "./AddressRow"
import Swap from "./Swap"
import Submit from "./Submit"
import Estimated from "./Estimated"
import Amount from "./Amount"
import AddressLabel from "./AddressLabel"
import { useForm, Controller } from "react-hook-form"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  setToCrypto,
  setFromCrypto,
  updateMinimalExchangeAmount
} from "@/src/redux/cryptoSlice"
import type { SubmitHandler } from "react-hook-form"
import type { Currency } from "@/src/BackendClient/types"

const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media only screen and (max-width: ${tablet}px) {
    width: 100%;
    padding: 0 16px;
  }
`

const ExchangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;

  & > label {
    font-size: 0.8em;
  }
`

export type FormInput = {
  cryptoAddress: string
  cryptoAmount: string
}

export type ExchangeFormProps = {
  data?: Currency[]
  message?: string
}

function ExchangeForm({ data, message }: ExchangeFormProps) {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, control, setValue } = useForm<FormInput>()
  const [reachedMinimal, setReachedMinimal] = useState(false)

  useEffect(() => {
    if (data) {
      dispatch(setFromCrypto(data[0]))
      dispatch(setToCrypto(data[1]))
      dispatch(updateMinimalExchangeAmount())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Headers>
        <h1>Crypto Exchange</h1>
        <h2>Exchange fast and easy</h2>
      </Headers>
      <ExchangeContainer>
        <Block>
          <InputRow>
            <Controller
              control={control}
              name="cryptoAmount"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <Amount
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  onValueSet={(value) => setValue("cryptoAmount", value)}
                  options={data}
                  setReachedMinimal={setReachedMinimal}
                />
              )}
            />
            <Swap />
            <Estimated options={data} reachedMinimal={reachedMinimal} />
          </InputRow>
        </Block>
        <Block>
          <AddressLabel htmlFor="cryptoAddress" />
          <AddressRow>
            <Input
              autoComplete="off"
              defaultValue=""
              id="cryptoAddress"
              {...register("cryptoAddress")}
            />
            <Submit errorMessage={message} />
          </AddressRow>
        </Block>
      </ExchangeContainer>
    </Form>
  )
}

export default ExchangeForm
