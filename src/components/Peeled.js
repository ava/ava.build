import React from 'react'
import styled, { css } from 'styled-components'
import { media } from '../utils'

/**
 * Peely Letters
 */
const PeelyContainer = styled.p`
  color: rgb(65, 124, 59);
  font-family: 'Montserrat', sans-serif;
  font-size: 64px;
  ${media.phone`
    font-size: 66px;
  `}
  position: absolute;
  bottom: -9px;
  right: -5px;
  margin: 0px;
  & > span:first-child {
    margin-left: 0;
  }
`

const beforeAfter = css`
  display: block;
  position: absolute;
  top: 0;
  left: -1px;
  transform-origin: left top;
  transition: all ease-out 0.25s;
`

const Letter = styled.span`
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  perspective: 500;
  margin-left: .3em;
  &:before {
    ${beforeAfter}
    z-index: 1;
    color: rgba(0,0,0,0.2);
    transform: scale(1.1, 1) skew(0deg, 20deg);
    content: '${props => props.children}';
  }
  &:hover::before {
    transform: scale(1.1, 1) skew(0deg, 5deg);
  }
  &:after {
    ${beforeAfter}
    z-index: 2;
    color: ${props => props.color};
    text-shadow: -1px 0 1px ${props => props.color}, 1px 0 1px rgba(0,0,0,0.8);
    transform: rotateY(-40deg);
    content: '${props => props.children}';
  }
  &:hover::after {
   transform: rotateY(-10deg);
  }
`

export const Peeled = props => (
  <PeelyContainer {...props}>
    {(props.phrase || 'Peeled').split('').map((letter, i) => (
      <Letter color={props.color || '#119711'} key={i}>{letter.toUpperCase()}</Letter>
    ))}
  </PeelyContainer>
)