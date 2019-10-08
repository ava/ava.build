import styled from 'styled-components'
import { media } from '../../utils'

export const Mouse = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(137,183,44);
  z-index: 2;
  pointer-events: none;
  /* mix-blend-mode: difference;
  /* make it so div is directly centered on cursor */
  /* transform: translateX(-50%) translateY(-50%);  */

  /* transition: all 300ms linear;  */

  ${media.phone`
    display: none;
  `}
`