import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';
import { Container, LargeLabel, Divider, ToggleButton } from '../../../style/elements';
import styled from 'styled-components';

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
                <ToggleButton>Table</ToggleButton>
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
                    <div>Hi</div>
                )}

        </Container>
    )
}



const FlexContainer = styled.div`
margin: 3rem 0;
display: flex;
justify-content: space-between;
${ToggleButton}{
    align-self: flex-end;
}
${LargeLabel}{
    margin: 0;
    line-height: .9em;
}

`;

const OptionContainer = styled.div`
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