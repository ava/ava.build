import React, { useRef } from "react";
import styled from 'styled-components'
import { CursorProvider, Mouse, Follower } from 'components'
import { HomePage } from 'pages'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  const mouse = {
    isActive: false,
    x: useRef(0),
    y: useRef(0),
    ref: useRef(),
    ease: 1,
    isMoving: useRef(true),
    component: Mouse,
  }
  const follower = {
    isActive: false,
    x: useRef(0),
    y: useRef(0),
    ref: useRef(),
    ease: 0.1,
    isMoving: useRef(true),
    component: Follower,
  }

  return (
    <CursorProvider cursor={{ mouse, follower }}>
      <Router>
        <Nav />
        <HomePage />
      </Router>
    </CursorProvider>
  )
}

const Row = styled.div`
  display: flex;
`

const Nav = () => {
  return (
    <Row>
      {/* TODO */}
    </Row>
  )
}

export default App
