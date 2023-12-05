
import React, { useState } from "react";
import styled from "styled-components";

import useInput from "../useinput";

const Calculator = () => {

    const [maximumOccupancy, setMaximumOccupancy] = useState(0);
    const [errorMessage, setErrorMessage] = useState("")

    var message = "";

    const squareFeet = useInput("");
    const numberParking = useInput("");
    const numberBedrooms = useInput("");

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
            || !isNumeric(numberParking.value)
            || !isNumeric(numberBedrooms.value)) {
            message = "All inputs must be numeric."
        }

        setErrorMessage(message);

        if (message.length === 0) {
            const sqft = Number(squareFeet.value);
            const parking = Number(numberParking.value);
            const beds = Number(numberBedrooms.value)
            let adjustedSqft = sqft;
            if (beds > parking) {
                adjustedSqft = sqft - ((beds - parking) * 200);
            }

            var occupancy = Math.min(16, Math.ceil(adjustedSqft / 200));
            setMaximumOccupancy(occupancy);
        }
    };

    return (
        <>
            <FormWrapper onSubmit={submitForm}>
                <Row>
                    <Label>Sq. Ft.</Label>
                    <Label>#Parking</Label>
                    <Label>#Bedrooms</Label>
                </Row>
                <Row>
                    <Input id="sqft" placeholder="Sq. Ft." {...squareFeet} />
                    <Input id="parking" placeholder="Parking" {...numberParking} />
                    <Input id="bedrooms" placeholder="Bedrms" {...numberBedrooms} />
                    <Button id="compute" type="submit" >Compute</Button>
                </Row>
                <Row>
                    <Error> {errorMessage}</Error>
                </Row>
                <Row>
                    <MaximumOccupancy> Maximum Occupancy : {maximumOccupancy === 0 ? '?' : maximumOccupancy}</MaximumOccupancy>
                </Row>

            </FormWrapper>
        </>
    );

};



export default Calculator;
const Div = styled.div`
   
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

const MaximumOccupancy = styled.div`
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
