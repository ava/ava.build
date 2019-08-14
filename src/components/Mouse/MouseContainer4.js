import React, { useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Mouse, Follower } from '..'


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  /* cursor: url(./greenCircle.png) 5 5, none !important; */
  /* cursor: none; */
`

const useMouse = () => {
  const x = useRef(0)
  const y = useRef(0)
  const mouse = useRef()
  return {
    x,
    y,
    ref: mouse,
    handleMouseMove(e) {
      x.current = e.clientX
      y.current = e.clientY
    }
  }
}

const useFollower = ({ ease = 0.1, mouse } = {}) => {
  const x = useRef(0)
  const y = useRef(0)
  const follower = useRef()

  // const move = () => {
  //   console.log('HOOK FOLLOWER: ', follower.current)
  //   if (!(follower && follower.current)) return
  //   const {left, top} = follower.current.getBoundingClientRect()
  //   console.log('HOOK LEFT: ', left)
  //   console.log('HOOK TOP: ', top)
  //   // console.log('')
  //   const dX = mouse.x.current - (left + 16)
  //   const dY = mouse.y.current - (top + 16)
  //   x.current += dX * ease
  //   y.current += dY * ease
  //   // console.log('X.CURRENT: ', x.current)
  //   console.log('HOOK Y: ', y.current)
  //   follower.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
  //   requestAnimationFrame(move)
  // }
  return {
    x,
    y,
    // move,
    ref: follower,
  }
}


export const MouseContainer4 = ({ ease = 0.1, children }) => {
  const mouse = useMouse()
  const follower = useFollower({
    mouse,
    // ease: 0.1,
  })

  const moveFollower = useCallback(() => {
    if (!(follower && follower.ref && follower.ref.current)) return
    // console.log('FOLLOWER: ', follower.ref.current)
    const {left, top, width, height} = follower.ref.current.getBoundingClientRect()
    const dX = mouse.x.current - (left + width / 2)
    const dY = mouse.y.current - (top + height / 2)
    follower.x.current += dX * ease
    follower.y.current += dY * ease
    follower.ref.current.style.transform = `translate3d(${follower.x.current}px, ${follower.y.current}px, 0)`
    requestAnimationFrame(moveFollower)
  }, [mouse.x, mouse.y, follower, ease])

  // const moveMouse = useCallback(() => {
  //   if (!(mouse && mouse.ref && mouse.ref.current)) return
  //   const { width, height } = mouse.ref.current.getBoundingClientRect()
  //   // console.log('HEIGHT: ', height)
  //   const mid = 0
  //   const x = mouse.x.current - width * .5 - mid
  //   const y = mouse.y.current - height * .5 - mid
  //   mouse.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  //   requestAnimationFrame(moveMouse)
  // }, [mouse])

  useEffect(() => {
    moveFollower()
    // moveMouse()
  }, [moveFollower])
  
  return (
    <Outer onMouseMove={mouse.handleMouseMove}>
      {/* <Mouse ref={mouse.ref} /> */}
      <Follower ref={follower.ref} />
      {children}
    </Outer>
  )
}