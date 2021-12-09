import styled from "styled-components"
import { tablet } from "@/src/constants"

const AddressRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 32px;
  font-weight: 400;
  font-size: 1rem;

  @media only screen and (max-width: ${tablet}px) {
    flex-direction: column;
    gap: 16px;
  }
`

export default AddressRow
