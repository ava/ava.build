import React from 'react'
import styled from 'styled-components'
import { Snowflakes, Center, Peeled, Quote, SocialMedia } from './components'


const App = () => {
  
  return (
    <Snowflakes>
      <SocialMedia />
      <Center>
        <Logo />
        <Quote>Rapid Application Development</Quote>
        <Peeled phrase='Ava' color='rgb(137, 183, 44)' />
      </Center>
    </Snowflakes>
  )
}

const Logo = styled.img.attrs({
  src: `${window.location.origin}/ava-logo-green.png`
})`
  width: 180px;
  font-family: 'PT Sans';
`

export default App;
