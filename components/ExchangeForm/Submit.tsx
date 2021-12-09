import styled from "styled-components"
import { tablet } from "@/src/constants"
import { useAppSelector } from "@/src/redux/hooks"

const Container = styled.div`
  flex-shrink: 0;
  width: 205px;
  position: relative;
  font-size: 0.8rem;

  p {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    text-align: center;
    color: #e03f3f;
    font-size: 1em;
  }

  @media only screen and (max-width: ${tablet}px) {
    width: 100%;
  }
`

const Button = styled.button.attrs({
  type: "submit"
})`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;
  background-color: var(--brand);
  font-weight: 700;
  font-size: 1em;

  &:disabled {
    opacity: 0.7;
  }
`

type SubmitProps = {
  errorMessage?: string
}

function Submit({ errorMessage }: SubmitProps) {
  const error = useAppSelector((state) => state.crypto.errorMessage)

  const hasError = errorMessage || error != null

  return (
    <Container>
      <Button disabled={hasError}>EXCHANGE NOW</Button>
      <p>{errorMessage ? errorMessage : error}</p>
    </Container>
  )
}

export default Submit
