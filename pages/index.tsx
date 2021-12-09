import React from "react"
import ExchangeForm from "@/components/ExchangeForm"
import styled from "styled-components"
import BackendClient from "@/src/BackendClient"
import type { GetServerSideProps } from "next"
import type { ExchangeFormProps } from "@/components/ExchangeForm"

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`

type HomeProps = ExchangeFormProps & {}

function Home(props: HomeProps) {
  return (
    <Container>
      <ExchangeForm {...props} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await BackendClient.getAvailableCurrencies()

  if (response.status == 200) {
    return {
      props: {
        data: response.data
      }
    }
  }

  console.log(response)

  return {
    props: {
      message: response.message
    }
  }
}

export default Home
