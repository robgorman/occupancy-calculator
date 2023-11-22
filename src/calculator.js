import React, {useState} from "react";
import styled from "styled-components";

import useInput from "./useinput";



const tabs = ['Calculator', 'Explanation']

const SignInForm = () => {

  const [maximumOccupancy, setMaximumOccupancy] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0]);
  var message = "";

  const squareFeet = useInput("");
  const numberParking = useInput("");
  const numberBedrooms = useInput("");

  function isNumeric(str) {
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
          || !isNumeric(numberBedrooms.value)){
       message = "All inputs must be numeric."
    }
   
    setErrorMessage(message);
    
    if (message.length === 0){
      let sqft = Number(squareFeet.value);
      let parking = Number(numberParking.value);
      let beds = Number(numberBedrooms.value) 
      let adjustedSqft = sqft;
      if (beds > parking){
        adjustedSqft = sqft - ((beds - parking) * 200);
      }

      var occupancy = Math.min(16,Math.ceil(adjustedSqft / 200));
      setMaximumOccupancy(occupancy);
    }

  };



  return (
    <>
    <ButtonGroup>
    {tabs.map(tab => (
          <Tab
            key={tab}
            activeTab={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
    </ButtonGroup>
    {activeTab === 'Calculator' &&
      <FormWrapper onSubmit={submitForm}>
        <Row>
          <Label>Sq. Ft.</Label>
          <Label>#Parking</Label>
          <Label>#Bedrooms</Label>
        </Row>
        <Row>
          <Input id="sqft" placeholder="Sq. Ft." {...squareFeet} />
          <Input id="parking" placeholder="Parking" {...numberParking} />
          <Input id="bedrooms" placeholder="Bedrooms" {...numberBedrooms} />
          <Button id="compute" type="submit" >Compute Maximum Occupancy</Button>
       </Row>
       <Row>
         <Error> {errorMessage}</Error>
       </Row>
       <Row>
         <MaximumOccupancy> Maximum Occupancy : {maximumOccupancy == 0 ? '?' : maximumOccupancy}</MaximumOccupancy>
       </Row>
     
      </FormWrapper>
    }
     {activeTab === 'Explanation' &&
     <Explanation>
        <p>
            <Text>As a short term rental investor, knowing the maximum number of guests you 
            allow in your property is an important economic consideration. All things
            being equal, the more guests your property can host, the more you can charge.
            </Text>
        </p>
        <p>
            <Text>The city of Big Bear Lake local ordinances prescribe the maximum occupancy 
              of all short term rentals located within the city limits. But the ordinance
              wording is not very clear and there are a number of edge cases and subtleties
              that are not well covered. But surely there is a formula somewhere for 
              calculating the maximum occupancy. It must exist! But I have found that the 
              city of Big Bear Lake will not publish it. I requested the formula in 
              a series of email exchanges with the city. After a lengthy exchange I *believe* 
              that I have derived the formula. Although I sent my derived formula to the city, 
              I never received a acknowledgment that it is indeed the correct calculation. 
              Nevertheless, it fits all examples that I was given as well as all the actual rentals
              that I have applied it to. Written in Excel spreadsheet language, the formula is:
            </Text>
        </p>
        <p><Code>
           =MIN(16,ROUNDUP((sqft - IF(parking &lt; bdr, 200*(bdr-parking), parking))/200, 0))
        </Code></p>
        <p>
            <Text>Where <Code>sqft</Code> is the square footage of the property. <Code>bdr</Code> is the
             number of bedrooms and <Code>parking </Code>
              is the approved number of parking spaces.
            </Text>
        </p>
        <p>
            <Text>In English, this formula says that the maximum occupancy is the minimum of 16 or a
              calculation based on the square footage, number of bedrooms and number of approved parking 
              spaces. 
            </Text>
        </p>
        <p>
            <Text>The calculation starts with the square footage. But if your property has 
              more bedrooms than parking spaces you must adjust the square footage downward by 
              the difference between the number of bedrooms and parking spaces. Call this the
             "adjusted square footage". If your property has at least as many parking spaces
              as bedrooms then there is no adjustment and the "adjusted square footage" is 
              simply the actual square footage. 
            </Text>
            </p>
        <p>
            <Text>Once you know the adjusted square footage the maximum occupancy 
              is calculated by dividing adjusted square footage by 200, then rounding up.  
            </Text>
        </p>
        <p>
            <Text>For the most part, this formula makes some sense as to the goals of the city. They want to 
              both limit occupancy and minimize the number of cars. However, there is significant flaw to 
              the formula. Consider a property with 1500 square feet, 2 parking spaces and 4 bedrooms. The 
              max occupancy is 6.  Now consider a similar property with the same numbers except 3 bedrooms. The max 
              occupancy is 7.  Seems counter-intuitive. More bedrooms equals less occupancy. I think the city 
              should fix this. 
            </Text>
        </p>
        <p>
            <Text>One last note. I discovered this flaw in the formula because my property
              has about 1500 square feet 4 bedrooms and 2 parking spaces. It didn't seem fair
              that a similar property with less bedrooms gets higher occupancy. And one of my 
              "bedrooms" isn't really a bedroom. Its a game room with a pool table. In the 
              end I was able to convince the city to adjust my max occupancy to 7. But it took
              me quite some time to figure out both the formula and convince the city to make
              an exception. I think they should be more transparent in the calculation for 
              maximum occupancy. 
            </Text>
        </p>
      </Explanation>
        
    }
    </>
  );
};

export default SignInForm;

const Explanation = styled.div`
  margin: 10px 0px 0px 70px;
`
const Code = styled.text`
  font-family: Courier New;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  text-align: left;
  margin: 0px 0px;
`;

const Text = styled.text`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  text-align: left;
`;

const Tab = styled.button`
  font-size: 30px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: .5;
  background: #282c34;
  
  color: white;
  border: 0;
  outline: 0;
  ${({ activeTab }) =>
    activeTab &&
    `
    border-bottom: 2px solid white;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

const Label = styled.div`
  width : 70px;
  border-radius: 5px; 
  margin-top: 20px; 
  margin-bottom: -14px;
  color: #ffffff;
  background-blend-mode: overlay;
  vertical-align: bottom;
  padding-right: 25px;
`

const MaximumOccupancy = styled.div`
   color: #82E0AA;
   text-align: center;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
   Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-style: normal;
   font-weight: bold;
   font-size: 40px;
   line-height: 48px;
   color: #ffffff;
   text-align: center;
`

const Error = styled.div`
color: #E59866;
text-align: center;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const FormWrapper = styled.form`
  display: grid;
  class: form-horizontal;
  justify-content: center;
  gap: 20px;

  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
`;

const Input = styled.input`
  width : 70px;
  border-radius: 5px; 
  margin-right: 20px;
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
  padding: 12px 0;
  width: 250px;
  border: none;
  border-radius: 30px;
  color: black;
  font-weight: bold;
  font-family: Segoe UI, sans-serif;
  cursor: pointer;
  
`;
