import React, { useEffect, useRef, useCallback } from 'react'
import { CursorContext } from './CursorContext'
import styled, { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  a[href], input[type='submit'], input[type='image'], label[for], select, button, .pointer {
    cursor: none;
  }
`;

const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: grid;
  cursor: none;
`

// BUGFIX: when scrolling, the mouse doesn't scroll down
// like it should
export const CursorProvider = ({ cursor, children }) => {
  if (!cursor) throw Error('Must have a cursor passed into the <CursorProvider cursor={cursor} />')
  if (!cursor.mouse) throw Error("'mouse' is required as a key in the 'cursor' object")

  const { components, theCursor, moves } = Object.entries(cursor).reduce(
    (acc, [key /* i.e. 'mouse' and 'follower' */, cursorPart]) => {
      const { component, move, ...rest } = cursorPart
      acc.components[key] = {
        component,
        ref: rest.ref
      }
      if (key !== 'mouse' && move) acc.moves.push(move)
      acc.theCursor[key] = rest
      return acc
    },
    {
      components: {},
      theCursor: {},
      moves: []
    }
  )

  const { mouse, follower } = cursor

  const handleMouseMove = e => {
    mouse.x.current = e.pageX
    mouse.y.current = e.pageY
  }

  const moveMouse = useCallback(() => {
    if (!(mouse.ref && mouse.ref.current)) return
    if (mouse.isMoving.current) {
      const { width, height } = mouse.ref.current.getBoundingClientRect()
      const x = mouse.x.current - width * .5
      const y = mouse.y.current - height * .5
      mouse.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    requestAnimationFrame(moveMouse)
  }, [mouse])

  const moveFollower = useCallback(() => {
    if (!(follower.ref && follower.ref.current)) return
    if (follower.isMoving.current) {
      const {left, top, width, height} = follower.ref.current.getBoundingClientRect()
      const dX = mouse.x.current - (left + width / 2)
      const dY = mouse.y.current - (top + window.scrollY + height / 2)
      follower.x.current += dX * follower.ease
      follower.y.current += dY * follower.ease
      follower.ref.current.style.transform = `translate3d(${follower.x.current}px, ${follower.y.current}px, 0)`
    }
    requestAnimationFrame(moveFollower)
  }, [follower.ease, follower.isMoving, follower.ref, follower.x, follower.y, mouse.x, mouse.y])

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    moveMouse()
    if (follower && !follower.move) moveFollower()
    for (var move of moves) move()
  }, [theCursor, moves, moveMouse, moveFollower, follower])

  return (
    <CursorContext.Provider value={theCursor}>
      <Outer onMouseMove={handleMouseMove}>
        <GlobalStyle />
        {Object.entries(components).map(([key, { ref, component: Comp }]) => (
          <Comp key={key} ref={ref} />
        ))}
        {children}
      </Outer>
    </CursorContext.Provider>
  )
}
