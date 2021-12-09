import styled from "styled-components"
import { Currency } from "@/src/BackendClient/types"
import Image from "next/image"

const Container = styled.div`
  position: absolute;
  left: -1px;
  top: 100%;
  border: 1px solid var(--light-gray);
  width: calc(100% + 2px);
  max-height: 200px;
  z-index: 2;
  background-color: var(--background);
  font-size: 1rem;
`

const PopupElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
  font-size: 0.8em;
  font-weight: 400;
  color: var(--dark-gray);
  cursor: pointer;
`

const ColoredName = styled.span`
  color: #80a2b6;
`

type PopupProps = {
  display: Currency[]
  onClick: (selected: Currency) => void
}

function Popup({ display, onClick }: PopupProps) {
  return (
    <Container>
      {display.map((element) => (
        <PopupElement key={element.name} onClick={() => onClick(element)}>
          <Image width={15} height={20} src={element.image} alt="Logo" />
          <span>{element.ticker.toUpperCase()}</span>
          <ColoredName>{element.name}</ColoredName>
        </PopupElement>
      ))}
    </Container>
  )
}

export default Popup
