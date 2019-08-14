import React, { useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Follower } from '..'


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  /* cursor: none; */
`

const Canvas = styled.canvas`
  position: absolute;
  /* width: 100%; */
  /* height: 100%; */
  width: 20px;
  height: 20px;
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


const RADIUS = 20;

function degToRad(degrees) {
  var result = Math.PI / 180 * degrees;
  return result;
}

export const MouseContainer2 = ({ ease = 0.1, children }) => {
  const outer = useRef()
  const canvas = useRef()

  var x = useRef(50);
  var y = useRef(50);

  const canvasDraw = useCallback(()  => {
    var ctx = canvas.current.getContext("2d");
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.fillStyle = "rgb(137,183,44)";
    ctx.beginPath();
    ctx.arc(x.current, y.current, RADIUS, 0, degToRad(360), true);
    ctx.fill();
  }, [])

  var animation = useRef()
  const updatePosition = useCallback(e => {
    console.log('E: ', e)
    console.log(`x.current(${x.current}) + movementX(${e.movementX}) = ${x.current + e.movementX}`)
    console.log('movementX: ', e.movementX)
    console.log('movementY: ', e.movementY)
    x.current = e.clientX;
    y.current = e.clientY;
    // x.current += e.movementX;
    // y.current += e.movementY;
    // if (x.current > canvas.current.width + RADIUS) {
    //   x.current = -RADIUS;
    // }
    // if (y.current > canvas.current.height + RADIUS) {
    //   y.current = -RADIUS;
    // }  
    // if (x.current < -RADIUS) {
    //   x.current = canvas.current.width + RADIUS;
    // }
    // if (y.current < -RADIUS) {
    //   y.current = canvas.current.height + RADIUS;
    // }
    console.log('X: ', x.current)
    console.log('Y: ', y.current)
    // tracker.textContent = "X position: " + x + ", Y position: " + y;

    if (!animation.current) {
      animation.current = requestAnimationFrame(() => {
        animation.current = null;
        canvasDraw();
      });
    }
  }, [canvasDraw])

  const lockChangeAlert = useCallback(() => {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
      console.log('The pointer lock status is now locked');
      document.addEventListener("mousemove", updatePosition, false);
    } else {
      console.log('The pointer lock status is now unlocked');  
      document.removeEventListener("mousemove", updatePosition, false);
    }
  }, [updatePosition])

  useEffect(() => {
    document.documentElement.style.cursor = 'url(' + canvas.current.toDataURL() + ') 64 64, auto';
    // document.documentElement.style.cursor = 'url(' + canvas.current.toDataURL() + ') 64 64, auto';
    // canvasDraw()
    // const theCanvas = canvas.current
    // theCanvas.onclick = () => {
    //   theCanvas.requestPointerLock()
    // }
    // // Hook pointer lock state change events for different browsers
    // document.addEventListener('pointerlockchange', lockChangeAlert, false);
    // document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    // outer.current.addEventListener('mousemove', updatePosition, false)
    // return () => {
    //   theCanvas.exitPointerLock()
    // }
  }, [canvasDraw, lockChangeAlert, updatePosition])


  const mouse = useMouse()
  const follower = useFollower({
    // mouse,
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
  }, [follower, mouse.x, mouse.y, ease])

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
    <Outer ref={outer} onMouseMove={mouse.handleMouseMove}>
      <Canvas ref={canvas} />
      {/* <Mouse ref={mouse.ref} /> */}
      {/* <Follower ref={follower.ref} /> */}
      {children}
    </Outer>
  )
}