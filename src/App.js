import React from "react";
import styled from "styled-components";
import backgroundImage from "./images/BigBearLakeSeal.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import Calculator from "./components/calculator";
import Explanation from "./components/explanation";

const Wrapper = styled.div`
  padding-top: 0px;
  margin: 0 auto;
  background-color: #282c34;
  align-items: center;
  justify-content : center;
  flex-direction : column;
  width : 100%;
  height: 100%;
  padding-bottom: 500px;
`;

const Byline = styled.h1`
  margin-bottom: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: italic;
  font-weight: bold;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
`;

const Title = styled.h1`
display: block;
margin-left: auto;
margin-right: auto;
width: 80%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
`;

const BigBearIcon = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
`;



export default function App() {
  return (
    <Wrapper>
      <BigBearIcon src={backgroundImage} alt="City of Big Bear Lake Seal"></BigBearIcon>
      <Title>Welcome to Rob's Official, Unofficial City Of Big Bear Lake Short Term Rental Occupancy Calculator.</Title>
      <Byline>Brought to you by rob@ranchosoftware.com</Byline>

      <Tabs>
        <TabList>
          <Tab>Calculator</Tab>
          <Tab>Explanation</Tab>
        </TabList>

        <TabPanel>
          <Calculator />
        </TabPanel>
        <TabPanel>
          <Explanation />
        </TabPanel>
      </Tabs>
    </Wrapper>
  );
}
