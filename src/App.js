import React from "react";
import styled from "styled-components";
import backgroundImage from "./images/BigBearLakeSeal.png";

import Calculator from "./calculator";

export default function App() {
  return (
    <Wrapper>
   <Background alt="background" />
      <Image src={backgroundImage}></Image>
      <Title>Welcome to Rob's Official, Unofficial City Of Big Bear Lake Short Term Rental Maximum Occupancy Calculator.
      </Title>
    
      <Calculator />
    </Wrapper>
  );
}
const Image = styled.img`

`;
const Wrapper = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  background-color: #282c34;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 60px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
`;

const Description = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
`;

const Background = styled.img`
  position: absolute;
  width: 100%;
  top: 0px;
  z-index: -1;
`;
