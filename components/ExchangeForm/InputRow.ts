import styled from "styled-components"
import { tablet } from "@/src/constants"

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  font-size: 1rem;

  & > svg {
    color: var(--brand);
    font-size: 1.5em;
  }

  @media only screen and (max-width: ${tablet}px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }
`

export default InputRow
