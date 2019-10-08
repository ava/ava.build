import React from 'react'
import styled from 'styled-components'
import { Snowflakes, Center, Peeled, Quote, SocialMedia, Page } from "components";
import { useCursor } from 'components'


export const HomePage = () => {
  const smallerCursor = useCursor({
    onMouseEnter({ follower }) {
      let increase = 90
      follower.ref.current.style.cssText = `
        width: ${increase}px;
        height: ${increase}px;
        border: 4px solid rgb(65, 124, 59);
        mix-blend-mode: inherit;
        transition: width .55s, height .55s;
      `
    },
    onMouseLeave({ follower }) {
      follower.ref.current.style.cssText = `
        transition: width .55s, height .55s;
        width: 3px;
        height: 3px;
      `
    }
  })
  const cursor = useCursor({
    onMouseEnter({ follower }) {
      let increase = 120
      // follower.isMoving.current = false
      // const hoveredEl = e.currentTarget
      // const { top, left, width, height } = hoveredEl.getBoundingClientRect()
      // const increase = 400
      // const followerRadius = increase / 2
      // const x = left - (followerRadius - width / 2)
      // const y = top - (followerRadius - (height / 2) - window.scrollY - 10)     //+ increase / 2// - subtract[increase].top // - increase / 2
      follower.ref.current.style.cssText = `
        width: ${increase}px;
        height: ${increase}px;
        border: 4px solid rgb(65, 124, 59);
        mix-blend-mode: inherit;
        transition: width .55s, height .55s;
      `
        // transform: translate3d(${x}px, ${y}px, 0)
    },
    onMouseLeave({ follower }) {
      // follower.isMoving.current = true
      follower.ref.current.style.cssText = `
        transition: width .55s, height .55s;
        width: 3px;
        height: 3px;
      `
    }
  })

  return (
    <Page id='home'>
      <Snowflakes>
        <SocialMedia {...smallerCursor.bind} />
        <Center>
          <Col id='logo-area' {...cursor.bind}>
            <Row>
              <Logo />
              <Peeled phrase="Ava" color="rgb(137, 183, 44)" />
            </Row>
            <Quote>Rapid Application Development</Quote>
          </Col>
        </Center>
      </Snowflakes>
    </Page>
  );
}

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: relative;
`

const Logo = styled.img.attrs({
  src: `./ava-logo-green.png`
})`
  width: 135px;
  /* font-family: 'PT Sans'; */
`