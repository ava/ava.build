import React from 'react'
import styled from 'styled-components'
import { ImagePage, Center } from 'components'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  align-items: center;
`

export const ContactPage = () => {
  return (
    <ImagePage title='Contact' id='contact' image='./green-envy.jpg'>
      <Center style={{height: 450, background: 'black'}}>
        <Row>
          <input placeholder='email' />
          <textarea placeholder='message' />
        </Row>
      </Center>
    </ImagePage>
  )
}