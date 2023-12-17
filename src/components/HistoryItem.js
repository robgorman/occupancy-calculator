import styled from "styled-components";

const TR = styled.tr`
   color: #82E0AA;
   text-align: center;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
   Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-style: normal;
   font-weight: bold;
   
   color: #ffffff;
   text-align: center;
`
const HistoryItem = ({ item }) => {
    return (
        <>
            <TR >
                <td>{item.squareFootage}</td>
                <td>{item.bedrooms}</td>
                <td>{item.cars}</td>
                <td>{item.rawTotalOccupancy}</td>
                <td>{item.totalOccupancy}</td>
                <td>{item.adultOccupancy}</td>
                <td>{item.roundUp}</td>
            </TR>
        </>
    );

};

export default HistoryItem;;