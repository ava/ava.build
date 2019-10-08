import React from 'react'
import styled, { css } from 'styled-components'
import { Page } from '.'

export const ImagePage = ({ image = './smart-light.jpg', children, right, title, ...props }) => {
  return (
    <Page {...props}>
      <HeaderImage src={image} right={right}>
        <Title>{title}</Title>
      </HeaderImage>
      {children}
    </Page>
  )
}

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: lighter;
  font-size: 60px;
`

const padding = 60
const HeaderImage = styled.div`
  background: url(${props => props.src}) no-repeat center fixed;
  width: 100vw - ${padding * 2};
  height: 500px;
  display: flex;
  align-items: center;
  padding: 0 ${padding}px;
  ${props => props.right && css`
    justify-content: flex-end;
  `}
`
