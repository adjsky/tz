import styled from "styled-components"

const Input = styled.input`
  width: 100%;
  font-size: 0.8em;
  font-weight: 400;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 4px 0;

  &::placeholder {
    color: var(--light-gray);
  }

  &:disabled {
    color: var(--dark-gray);
  }
`

export default Input
