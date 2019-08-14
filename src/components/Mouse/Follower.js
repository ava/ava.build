import styled from 'styled-components'

export const Follower = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.6;
  pointer-events: none;
  box-sizing: border-box;
  z-index: 3;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    border: 4px solid rgb(65,124,59); /* hsl(220, 58%, 85%); */
    box-sizing: border-box;
  }
`
  