import React from 'react'
import styled, { css } from 'styled-components'
import { media } from '../utils'

/**
 * Peely Letters
 */
const PeelyContainer = styled.p`
  /* color: #fff; */
  color: rgb(65, 124, 59);
  font-family: Arial, Helvetica, sans-serif;
  /* font-family: Avenir Next, Helvetica Neue, Helvetica, Tahoma, sans-serif; */
  font-size: 1em;
  font-weight: 700;
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
  font-size: 40px;
  ${media.phone`
    font-size: 40px;
  `}
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