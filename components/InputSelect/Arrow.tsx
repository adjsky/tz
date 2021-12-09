import React from "react"
import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io"

const Container = styled.span`
  position: absolute;
  display: flex;
  right: 19px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    color: #80a2b6;
    font-size: 1em;
  }
`

function Arrow() {
  return (
    <Container>
      <IoIosArrowDown />
    </Container>
  )
}

export default Arrow
