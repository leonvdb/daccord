import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';
import { Container, LargeLabel, Divider, ToggleViewButton, TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';
import ListWhite from '../../../images/list-white.svg';
import TableWhite from '../../../images/table-white.svg';
import SVG from 'react-inlinesvg';
import { darkGray } from '../../../style/utilities';

interface Props {
    poll: IPollQuery
    user: IUser
}

const Results = (props: Props) => {
    const [currentView, setCurrentView] = useState('list')
    const unsortedOptions = [...props.poll.options]
    const sortedOptions = unsortedOptions.sort((a, b) => {
        if (a.result.agreementInPercent > b.result.agreementInPercent) {
            return -1
        } else if (a.result.agreementInPercent < b.result.agreementInPercent) {
            return 1
        } else {
            return 0
        }
    })
    return (
        <Container>
            <FlexContainer>
                <LargeLabel>Results</LargeLabel>
                <ToggleViewButton currentView={currentView}>
                    <div className="list-select" onClick={ // tslint:disable-next-line jsx-no-lambda
                        () => { setCurrentView('list') }}>
                        <SVG src={ListWhite} />
                    </div>
                    <div className="table-select" onClick={ // tslint:disable-next-line jsx-no-lambda
                        () => { setCurrentView('table') }}>
                        <SVG src={TableWhite} />
                    </div>
                </ToggleViewButton>
            </FlexContainer>
            {currentView === 'list' ? (
                <OptionContainer>
                    {sortedOptions.map((option, index) => {
                        return (<div key={option.refId}>
                            <ResultElement option={option} poll={props.poll} user={props.user} rank={index + 1} setCurrentView={setCurrentView} />
                            {index + 1 !== sortedOptions.length && <Divider />}
                        </div>
                        )
                    })}
                </OptionContainer>

            ) : (
                    <OptionContainer>
                        <TableWrapper>
                            <div className="partcipants-row table-row">
                                <TableCellWrapper widthInPercent={29.29} />
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                            </div>
                            <div className="table-row">
                                <TableCellWrapper widthInPercent={29.29} />
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                                <TableCellWrapper widthInPercent={10}>
                                    Bla
                        </TableCellWrapper>
                            </div>
                        </TableWrapper>
                    </OptionContainer>
                )}

        </Container>
    )
}



const FlexContainer = styled.div`
margin: 3rem 0;
display: flex;
justify-content: space-between;
${ToggleViewButton}{
    align-self: flex-end;
}
${LargeLabel}{
    margin: 0;
    line-height: .9em;
}
`;

const TableWrapper = styled.div`
display: table;
background: white;
width: 100%;
text-align: center;
.table-row{
    display: table-row;
}

.partcipants-row{
    ${TableCellWrapper}{
    border-bottom: solid 2px ${darkGray};
    font-weight: 500;
}
}
${TableCellWrapper}{
    height: 4.5625rem;
    border-style: solid;
    border-color: #DDD;
    border-width: 0px 0px 1px 1px;
}
${TableCellWrapper}:first-child{
    border-left: none;
    border-right: solid 2px ${darkGray};
}
${TableCellWrapper}:nth-child(2){
    border-left: none;
}
`

const OptionContainer = styled.div`
overflow: hidden;
${ResultElement}:first-child{
    border-radius: 5px 5px 0 0;
}
${ResultElement}:last-child{
    border-radius: 0 0 5px 5px;
}
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
`;

export default Results;