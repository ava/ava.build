import styled, { css } from 'styled-components'
import { media } from '../../utils'

export const Follower = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  opacity: 0.6;
  pointer-events: none;
  box-sizing: border-box;
  z-index: 3;
  /* mix-blend-mode: difference; */
  /* transition: all 300ms linear;  */
  border: 4px solid rgb(65, 124, 59);/* rgb(137,183,44); */
  ${props => props.active && css`
	  background: rgba(255,255,255,1);
    /* transform:scale(2) translateX(-25%) translateY(-25%); */
  `}
  ${media.phone`
    display: none;
  `}
`
  