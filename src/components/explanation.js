
import React from "react";
import styled from "styled-components";
import formulaFlawImage from "../images/formulaFlaw2.png";

const FormulaFlaw = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  border: 4px solid green;;
`;

const Explanation = () => {
    return (
        <>
            <ExplanationWrapper>
                <Paragraph>
                   As a short term rental investor, knowing the maximum number of guests you
                        allow in your property is an important economic consideration. All other things
                        being equal, the more guests your property can host, the more you can charge.
                </Paragraph>
                <Paragraph>
                    The city of Big Bear Lake local ordinances prescribe the allowed occupancy
                        of all short term rentals located within the city limits. But the ordinance
                        wording is not very clear and there are a number of edge cases and subtleties
                        that are not well documented. But surely there is a formula somewhere for
                        the calculation. It must exist! But I have found that the
                        city of Big Bear Lake does not publish it. I requested the formula in
                        a series of email exchanges with the city. After a lengthy exchange, I *believe*
                        that I have derived the formula. Actually the formula computes two values: 
                        <ol>
                            <li>The maximum adult occupancy</li>
                            <li>The maximum total occupancy which consists of the maximum adult occpancy plus allowed minors</li>
                            </ol>
                            Although I sent my derived formula to the city,
                        I never received a acknowledgment that it is indeed the correct calculation.
                        Nevertheless, it mostly fits all examples and actual rentals
                        that I have applied it to. There is some discrepency that I believe is due to the underlying rounding
                        rules. Some examples the city has provided me work only if occupancy is rounded up in the calculation.
                        And some examples work only if occupancy is rounded (ie .49 and lower goes to 0 and .5
                        and higher goes to 1 ). Also some property owners on Facebook have reported that the city does not 
                        round at all, but rather truncates in their cases. I believe that the city does not always apply the rules
                        consistently. So my calculator comes in three flavors. One rounds up and one simply rounds and one truncates. 
                        Written in psuedo-Excel spreadsheet language, the formulas are:
                    
                </Paragraph>
                <Paragraph>Round Up Formula:
                    <Code>
                    Total Occupancy (TO) =MIN(16,ROUNDUP((sqft - IF(parking &lt; bdrms, 200*(bdrms-parking), parking))/200, 0))<br></br>
                    Adult Occupancy (AO) =MIN(TO, (bdrms * 2) + 2)
                    </Code>
                </Paragraph>
                <Paragraph>Simple Rounding Formula:
                    <Code>
                    Total Occupancy (TO) =MIN(16,ROUND((sqft - IF(parking &lt; bdrms, 200*(bdrms-parking), parking))/200, 0))<br></br>
                    Adult Occupancy (AO) =MIN(TO, (bdrms * 2) + 2)
                    </Code>
                </Paragraph>
                <Paragraph>Truncation Formula:
                    <Code>
                    Total Occupancy (TO) =MIN(16,TRUNC((sqft - IF(parking &lt; bdrms, 200*(bdrms-parking), parking))/200, 0))<br></br>
                    Adult Occupancy (AO) =MIN(TO, (bdrms * 2) + 2)
                    </Code>
                </Paragraph>
                <Paragraph>
                    Where <Code>sqft</Code> is the square footage of the property. <Code>bdrms</Code> is the
                        number of bedrooms and <Code>parking</Code>
                        is the number of parking spaces.
                </Paragraph>
                <Paragraph>
                    In English, this formula says that the maximum occupancy is the minimum of 16 or a
                        calculation based on the square footage, number of bedrooms and number of approved parking
                        spaces.
                </Paragraph>
                <Paragraph>
                    The total occupancy calculation starts with the square footage. But if your property has
                        more bedrooms than parking spaces you must adjust the square footage downward by
                        the difference between the number of bedrooms and parking spaces times 200. Call this the
                        "adjusted square footage". If your property has at least as many parking spaces
                        as bedrooms then there is no adjustment and the "adjusted square footage" is
                        simply the actual square footage.
                </Paragraph>
                <Paragraph>
                    Once you know the adjusted square footage, the maximum occupancy
                        is calculated by dividing adjusted square footage by 200, then rounding (or truncating). I think the city is not consistent 
                        in which rule they use. 
                        Rounding Up, Simple Rounding and Truncation all seem to be in use.
                </Paragraph>
                <Paragraph>
                    The adult occupancy is the minimum of the total occupancy or the number of bedrooms times 2 plus 2.
                </Paragraph>
                <Paragraph>
                    Some aspects of these formulas make sense as to the goals of the city. They want to
                        both limit occupancy and minimize the number of cars driving up the mountain. However, there is significant flaw to
                        the formula. Consider a property with 1500 square feet, 2 parking spaces and 4 bedrooms. The
                        max occupancy is 6.  Now consider a similar property with the same numbers except 3 bedrooms. The max
                        occupancy is 7.  Seems counter-intuitive. More bedrooms equals less occupancy. I think the city
                        should fix this. Here's an example of this calculation in action:
                    
                </Paragraph>
                <FormulaFlaw src={formulaFlawImage} alt="City of Big Bear Lake Seal"></FormulaFlaw>
                <Paragraph>
                    One last note. I discovered this flaw in the formula because my property
                        has about 1500 square feet 4 bedrooms and 2 parking spaces. It didn't seem fair
                        that a similar property with less bedrooms gets higher occupancy. And one of my
                        "bedrooms" isn't really a bedroom. Its a game room with a pool table. In the
                        end, I was able to convince the city to adjust my max occupancy to 7. But it took
                        me quite some time to figure out both the formula and convince the city to make
                        an exception. I think they should be more transparent in the calculation for
                     occupancy.
                    
                </Paragraph>
            </ExplanationWrapper>
        </>
    );

}
export default Explanation;


const ExplanationWrapper = styled.div`
  margin: 5px 0px 0px 35px;
`
const Code = styled.p`
  font-family: Courier New;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 11px;
  color: #ffffff;
  text-align: left;
  margin-left: 20px;
`;

const Paragraph = styled.p`
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 14px;
  margin-right:30px
`;
const Text = styled.text`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 10px;
  color: #ffffff;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 0px;
`;
