import React from 'react'
import styled from 'styled-components'
import { SocialLink } from '.'
import { media } from '../utils'

const Container = styled.div`
  position: absolute;
  color: white;
  ${media.phone`
    display: flex;
    margin: 8px;
  `}
  width: 50px;
  margin: 8px 0;
  text-align: center;
`

export const SocialMedia = props => (
  <Container {...props}>
    <SocialLink type='github' url='https://github.com/avainc' />
    <SocialLink type='linkedin' url='https://linkedin.com/company/avaassociates' />
    {/* <SocialLink type='codepen' url='https://codepen.io/alex-cory/' /> */}
    <SocialLink type='twitter' url='https://twitter.com/avaassociates' />
    <SocialLink type='facebook' url='https://fb.com/avaassociates' />
    {/* <SocialLink type='medium' url='https://medium.com/@alexcory' /> */}
    {/* <SocialLink type='jsfiddle' url='https://jsfiddle.net/user/alexcory/fiddles/' /> */}
    <SocialLink type='email' url='mailto:alex@ava.build' />
    {/* Runkit: https://runkit.com/alex-cory */}
    {/* Codesandbox: https://codesandbox.io/u/alex-cory */}
  </Container>
)
