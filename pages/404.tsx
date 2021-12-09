import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: var(--dark-gray);
  text-align: center;
  font-weight: 400;
`

function Error() {
  return <Container>404 Not Found</Container>
}

export default Error
