import styled from "styled-components"
import { mobile } from "@/src/constants"

const Info = styled.button.attrs({
  type: "button"
})`
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 40%;
  border-left: 1px solid var(--light-gray);
  font-size: 0.8em;
  cursor: pointer;
  padding-right: 10px;

  @media only screen and (max-width: ${mobile}px) {
    width: 60%;
  }
`

export default Info
