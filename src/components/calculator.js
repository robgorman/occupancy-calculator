
import React, { useState } from "react";
import styled from "styled-components";
import History from "./History";

import useInput from "../useinput";




const Calculator = () => {

  const [totalOccupancy, setTotalOccupancy] = useState(0);
  const [adultOccupancy, setAdultOccupancy] = useState(0);
  const [errorMessage, setErrorMessage] = useState("")
  const [history, setHistory] = useState([]);

  var message = "";

  const squareFeet = useInput("");
  const numberCars = useInput("");
  const numberBedrooms = useInput("");
  
  const roundingModes = [
    {label: "Round Up", value: "up"},
    {label: "Simple Rounding", value: "simple"}
  ]

  const [roundUp, setRoundUp] = useState("up");

  
  function onChangeRoundUp(event) {
    setRoundUp(event.target.value);
  }


  const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  const submitForm = (event) => {
    event.preventDefault();
    setErrorMessage("");
    message = "";
    if (!isNumeric(squareFeet.value)
      || !isNumeric(numberCars.value)
      || !isNumeric(numberBedrooms.value)) {
      message = "All inputs must be numeric."
    }

    setErrorMessage(message);

    if (message.length === 0) {
      const sqft = Number(squareFeet.value);
      const cars = Number(numberCars.value);
      const beds = Number(numberBedrooms.value)
      let adjustedSqft = sqft;
      if (beds > cars) {
        adjustedSqft = sqft - ((beds - cars) * 200);
      }

      let rawTotalOccupancy = adjustedSqft / 200;
      let totalOccupancy = roundUp ? Math.min(16, Math.ceil(rawTotalOccupancy)) : Math.min(16, Math.round(rawTotalOccupancy));
      setTotalOccupancy(totalOccupancy);
      let adultOccupancy = Math.min(totalOccupancy, (beds * 2) + 2);
      setAdultOccupancy(adultOccupancy);
      var newHist = history;
      var newArray = [{ 
        squareFootage: sqft, 
        bedrooms: beds, 
        cars: cars, 
        rawTotalOccupancy: rawTotalOccupancy, 
        totalOccupancy: totalOccupancy, 
        adultOccupancy: adultOccupancy, 
        roundUp: roundUp === "up" ? "Up" : "Simple"}];
      newHist = newArray.concat(history);
      setHistory(newHist);
    }
  };


  return (
    <>
      <FormWrapper onSubmit={submitForm}>
        <Row>
          <DroplistLabel>Rounding Mode:</DroplistLabel>
          <Select onChange={onChangeRoundUp}>
            {roundingModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}

          </Select>
        </Row>
       
        <Row>
          <Label>Sq. Ft.</Label>
          <Label>#Bdrms</Label>
          <Label>#Cars</Label>
        </Row>
        <Row>
          <Input id="sqft" placeholder="Sq. Ft." {...squareFeet} />
          <Input id="bedrooms" placeholder="Bedrms" {...numberBedrooms} />
          <Input id="parking" placeholder="Cars" {...numberCars} />
          <Button id="compute" type="submit" >Compute</Button>
        </Row>
        {errorMessage.length > 0 && <Row><Error> {errorMessage}</Error></Row>}
        <Row>
          <OccupancyDiv> Total Occupancy : {totalOccupancy === 0 ? '?' : totalOccupancy}</OccupancyDiv>
        </Row>
        <Row>
          <OccupancyDiv> Adult Occupancy : {adultOccupancy === 0 ? '?' : adultOccupancy}</OccupancyDiv>
        </Row>

        <Row>
          <History history={history}></History>
        </Row>


      </FormWrapper>
    </>
  );

};



export default Calculator;

const Select = styled.select`
  width : 140px;
  border-radius: 5px; 
  margin-top: 20px; 
  font-size: 14px;
  background-blend-mode: overlay;
  vertical-align: bottom;
`
const DroplistLabel = styled.div`
  width : 120px;
  border-radius: 5px; 
  margin-top: 20px; 
  margin-bottom: -14px;
  font-size: 14px;
  color: #ffffff;
  background-blend-mode: overlay;
  vertical-align: bottom;
  padding-right: 12px;
`

const Label = styled.div`
  width : 62px;
  border-radius: 5px; 
  margin-top: 20px; 
  margin-bottom: -14px;
  font-size: 14px;
  color: #ffffff;
  background-blend-mode: overlay;
  vertical-align: bottom;
  padding-right: 12px;
`

const OccupancyDiv = styled.div`
   color: #82E0AA;
   text-align: center;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
   Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-style: normal;
   font-weight: bold;
   font-size: 20px;
   line-height: 24px;
   color: #ffffff;
   text-align: center;
`

const Error = styled.div`
  color: #E59866;
  text-align: center;
`

const Row = styled.div`
    display: flex;
    text-align: center;
    flex-direction: row;
`;

const FormWrapper = styled.form`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  class: form-horizontal;
  justify-content: center;

  gap: 20px;

  padding-bottom: 50px;
`;
const Input = styled.input`
  width : 60px;
  border-radius: 5px; 
  margin-right: 10px;
  height: 20px;

  background-blend-mode: overlay;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 20px 40px rgba(31, 47, 71, 0.25),
    0px 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(250, 250, 250, 0.4);
  padding-right: 0px;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: #6295cf;

  width: 80px;
  height: 25px;
  border: none;
  border-radius: 30px;
  color: black;
  font-weight: bold;
  font-family: Segoe UI, sans-serif;
  cursor: pointer;
  
`;
