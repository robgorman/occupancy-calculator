
import React from "react";
import styled from "styled-components";

const Explanation = () => {
    return (
        <>
            <ExplanationWrapper>
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
                        the difference between the number of bedrooms and parking spaces times 200. Call this the
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
            </ExplanationWrapper>
        </>
    );

}
export default Explanation;


const ExplanationWrapper = styled.div`
  margin: 5px 0px 0px 35px;
`
const Code = styled.text`
  font-family: Courier New;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 11px;
  color: #ffffff;
  text-align: left;
  margin: 0px 0px;
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
