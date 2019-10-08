import styled from 'styled-components'
import { media } from 'utils'

export const Page = styled.div`
  background: black;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  ${media.phone`
    height: inherit;
  `}
`