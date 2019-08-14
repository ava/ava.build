import React from "react";
import styled from "styled-components";
import { Snowflakes, Center, Peeled, Quote, SocialMedia } from "./components";
import { MouseContainer } from './components'

const App = () => {
  return (
    <MouseContainer>
      <Snowflakes>
        <SocialMedia />
        <Center>
          <Col>
            <Row>
              <Logo />
              <Peeled phrase="Ava" color="rgb(137, 183, 44)" />
            </Row>
            <Quote>Rapid Application Development</Quote>
          </Col>
        </Center>
      </Snowflakes>
    </MouseContainer>
  );
};

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: relative;
`;
const Logo = styled.img.attrs({
  src: `${window.location.origin}/ava-logo-green.png`
})`
  width: 135px;
  /* font-family: 'PT Sans'; */
`;

export default App;
