import React from 'react'
import styled from 'styled-components'
import { ImagePage, Center } from 'components'

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  align-items: center;
`

const width = 150
const Logo = styled.img`
  max-width: ${width}px;
`

export const ClientsPage = () => {
  const ratio = 195 / 300
  return (
    <ImagePage title='Clients' id='clients'>
      <Center style={{height: 450, background: 'black'}}>
        <Row>
          <Logo src='./best-buy.svg' />
          <Logo src='./discord.png' style={{height: ratio * width}} />
          <Logo src='./facebook.png' />
        </Row>
      </Center>
    </ImagePage>
  )
}