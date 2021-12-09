import styled from "styled-components"
import { tablet } from "@/src/constants"

const Headers = styled.div`
  color: var(--dark-gray);
  font-size: 1rem;

  & > h1 {
    font-weight: 300;
    font-size: 2.5em;
    margin: 10px 0;

    @media only screen and (max-width: ${tablet}px) {
      font-size: 2em;
    }
  }

  & > h2 {
    font-weight: 400;
    font-size: 1em;
  }
`

export default Headers
