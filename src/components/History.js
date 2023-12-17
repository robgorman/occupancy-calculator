import HistoryItem from './HistoryItem';
import styled from "styled-components";

const Table = styled.table`
   text-align: center;
   width: 300px;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
   Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-style: normal;
   font-weight: bold;
   font-size: 12px;
   line-height: 14px;
   border: 1px solid #82E0AA;
   color: #ffffff;
   text-align: center;
   table-layout:auto;
`

const Title = styled.div`
   color: #ffffff;
`

const History = ({ history }) => {


    if (history.length === 0) {
        return (<></>);
    }
    else {
        return (
            <>

                {
                    <div>
                        <Title>Calculation History</Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Sq. Ft</th>
                                    <th>#Bdrms</th>
                                    <th>#Cars</th>
                                    <th>Raw O.</th>
                                    <th>Max O.</th>
                                    <th>Adult O.</th>
                             
                                    <th>Round</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    history.map((item, index) => {
                                        return (
                                            <HistoryItem item={item} key={index}></HistoryItem>
                                        );
                                    })

                                }
                            </tbody>
                        </Table>
                    </div>}
            </>
        );
    }

};

export default History;
