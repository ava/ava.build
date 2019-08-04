import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faStackOverflow, faGithubSquare, faLinkedin, faCodepen, faJsfiddle, faMediumM } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFacebookSquare, faTwitterSquare, faStackOverflow, faGithubSquare, faLinkedin, faMediumM, faEnvelopeSquare);

const fontAwesomeStyles = {
  facebook: faFacebookSquare,
  twitter: faTwitterSquare,
  // instagram: 'fab fa-instagram fa-3x social-ig',
  email: faEnvelopeSquare,
  stackoverflow: faStackOverflow,
  github: faGithubSquare,
  linkedin: faLinkedin,
  medium: faMediumM,
  codepen: faCodepen,
  jsfiddle: faJsfiddle,
}

const colors = {
  facebook: '#3b5998',
  twitter: '#00aced',
  // instagram: 'fab fa-instagram fa-3x social-ig',
  email: '#dd4b39',
  stackoverflow: '#F48024',
  github: '#F1502F',
  linkedin: '#0077B5',
  medium: '#03a87c',
  codepen: '#76daff',
  jsfiddle: '#0084ff',
}

export const SocialLink = styled(({ type = 'facebook', className, url, ...props }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
    <Icon className={className} icon={fontAwesomeStyles[type]} size="2x" />
  </a>
))`
  color: white;
  transform: scale(.8) !important;
  transition: all .3s ease-in-out;

  &:hover {
    color: ${props => colors[props.type]};
    transition: all .3s ease-in-out;
    transform: scale(1.1) !important;
  }
`