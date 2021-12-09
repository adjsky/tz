import React, { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import styled from "styled-components"
import Input from "./Input"
import Arrow from "./Arrow"
import Info from "./Info"
import Close from "./Close"
import Popup from "./Popup"
import { handleNumberInput } from "./helpers"
import type { Currency } from "@/src/BackendClient/types"
import type { ChangeEvent } from "react"

type ContainerProps = {
  searching: boolean
  hasError?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: var(--background);
  padding: 10px 16px 10px;
  border-radius: 5px;
  border-bottom-left-radius: ${(props) => (props.searching ? "0px" : "5px")};
  border-bottom-right-radius: ${(props) => (props.searching ? "0px" : "5px")};
  font-size: 1rem;
  border: 1px solid
    ${(props) => (props.hasError ? "#E03F3F" : "var(--light-gray)")};
  color: var(--dark-gray);
  position: relative;
`

type InputSelectProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  options?: Currency[]
  selectedName: string | null
  onSelectChange: (selected: Currency) => void
  onlyNumber?: boolean
  hasError?: boolean
}

function InputSelect({
  options,
  selectedName,
  onChange,
  onBlur,
  value,
  onSelectChange,
  disabled,
  onlyNumber,
  hasError
}: InputSelectProps) {
  const [searching, setSearching] = useState(false)
  const [searchContext, setSearchContext] = useState("")
  const selectedOption = useMemo(
    () => options?.find((option) => option.name == selectedName),
    [selectedName, options]
  )
  const searchedOptions = useMemo(() => {
    const lowerCasedSearchCtx = searchContext.toLowerCase()
    return options?.filter(
      (option) =>
        option.name.toLowerCase().startsWith(lowerCasedSearchCtx) ||
        option.ticker.toLowerCase().startsWith(lowerCasedSearchCtx)
    )
  }, [searchContext, options])
  const inputHandler = onlyNumber ? handleNumberInput(onChange) : onChange

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchContext(value)
  }

  useEffect(() => {
    const handleClick = () => {
      setSearching(false)
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <Container
      searching={searching}
      onClick={(event) => event.stopPropagation()}
      hasError={hasError}
    >
      {searching ? (
        <Input
          name="search"
          autoComplete="off"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={searchContext}
        />
      ) : (
        <Input
          onChange={inputHandler}
          onBlur={onBlur}
          value={value}
          type="text"
          disabled={disabled}
        />
      )}
      {searching ? (
        <Close onClick={() => setSearching(false)} />
      ) : (
        <Info onClick={() => setSearching(true)}>
          {selectedOption && (
            <Image
              width={15}
              height={20}
              src={selectedOption.image}
              alt="Logo"
            />
          )}
          <span>{selectedOption && selectedOption.ticker.toUpperCase()}</span>
          <Arrow />
        </Info>
      )}
      {searchedOptions && searching && (
        <Popup
          display={searchedOptions.slice(0, 3)}
          onClick={(selected) => {
            onSelectChange(selected)
            setSearching(false)
          }}
        />
      )}
    </Container>
  )
}

export default InputSelect
