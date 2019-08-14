import React, { useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Mouse, Follower } from '..'

// const RADIUS = 20;

// function degToRad(degrees) {
//   var result = Math.PI / 180 * degrees;
//   return result;
// }

// // setup of the canvas

// var canvas = document.getElementById('canvas');

// var x = 50;
// var y = 50;

// function canvasDraw() {
//   var ctx = canvas.getContext('2d');
//   ctx.fillStyle = "black";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "#f00";
//   ctx.beginPath();
//   ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
//   ctx.fill();
// }
// // canvasDraw();

// // pointer lock object forking for cross browser

// canvas.requestPointerLock = canvas.requestPointerLock ||
//                             canvas.mozRequestPointerLock;

// document.exitPointerLock = document.exitPointerLock ||
//                            document.mozExitPointerLock;

// canvas.onclick = function() {
//   canvas.requestPointerLock();
// };

// // pointer lock event listeners

// // Hook pointer lock state change events for different browsers
// document.addEventListener('pointerlockchange', lockChangeAlert, false);
// document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

// function lockChangeAlert() {
//   if (document.pointerLockElement === canvas ||
//       document.mozPointerLockElement === canvas) {
//     console.log('The pointer lock status is now locked');
//     document.addEventListener("mousemove", updatePosition, false);
//   } else {
//     console.log('The pointer lock status is now unlocked');  
//     document.removeEventListener("mousemove", updatePosition, false);
//   }
// }

// var tracker = document.getElementById('tracker');

// var animation;
// function updatePosition(e) {
//   x += e.movementX;
//   y += e.movementY;
//   if (x > canvas.width + RADIUS) {
//     x = -RADIUS;
//   }
//   if (y > canvas.height + RADIUS) {
//     y = -RADIUS;
//   }  
//   if (x < -RADIUS) {
//     x = canvas.width + RADIUS;
//   }
//   if (y < -RADIUS) {
//     y = canvas.height + RADIUS;
//   }
//   tracker.textContent = "X position: " + x + ", Y position: " + y;

//   if (!animation) {
//     animation = requestAnimationFrame(function() {
//       animation = null;
//       canvasDraw();
//     });
//   }
// }


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
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


const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`


export const MouseContainer3 = ({ ease = 0.1, children }) => {
  // const mouse = useMove()
  // useEffect(() => {
  //   document.body.requestPointerLock()
  //   return () => {
  //     document.body.exitPointerLock()
  //   }
  // })
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

  const outer = useRef()
  const canvas = useRef()
  const onMouseMove = e => {
    mouse.handleMouseMove(e)
    // var canvas = document.createElement('canvas');
    // canvas.width = canvas.height = 128;
    var ctx = canvas.current.getContext('2d');
    var rect = canvas.current.getBoundingClientRect();
    var posx = e.clientX - rect.left;
    var posy = e.clientY - rect.top;

    // var circle = new Path2D();
    // circle.moveTo(posx, posy);
    // circle.arc(100, 35, 25, 0, 2 * Math.PI)

    ctx.fillStyle = 'rgb(137,183,44)';
    // ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true)
    ctx.arc(posx, posy, 10, 0, 2 * Math.PI);
    ctx.fill();
    console.log('DATA URL: ', canvas.current.toDataURL())
    
    outer.current.style.cursor = 'url(' + canvas.current.toDataURL() + ') 5 5, auto';
  }
  
  return (
    <Outer ref={outer} onMouseMove={onMouseMove}>
      <Canvas ref={canvas} />
      {/* <Mouse ref={mouse.ref} /> */}
      {/* <Follower ref={follower.ref} /> */}
      {children}
    </Outer>
  )
}