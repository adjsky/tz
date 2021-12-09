import React from "react"
import styled from "styled-components"
import { IoMdClose } from "react-icons/io"

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  & > svg {
    font-size: 1em;
    color: #80a2b6;
  }
`

type CloseProps = {
  onClick?: () => void
}

function Close({ onClick }: CloseProps) {
  return (
    <Container onClick={onClick}>
      <IoMdClose />
    </Container>
  )
}

export default Close
