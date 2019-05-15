import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';
import { Container, LargeLabel, Divider, ToggleViewButton } from '../../../style/elements';
import styled from 'styled-components';
import ListWhite from '../../../images/list-white.svg';
import TableWhite from '../../../images/table-white.svg';
import SVG from 'react-inlinesvg';
import TableView from './tableView';
import sortOptionsByAgreement from '../../../utilities/sortOptionsByAgreement';

interface Props {
    poll: IPollQuery
    user: IUser
    pseudonym: string
}

const Results = (props: Props) => {
    const [currentView, setCurrentView] = useState('list')
    const sortedOptions = sortOptionsByAgreement(props.poll.options)
    const { poll, pseudonym, user } = props;
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
                    <TableView poll={poll} pseudonym={pseudonym} user={user} />
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

const OptionContainer = styled.div`
overflow: hidden;
${ResultElement}{
    &:first-child{
        border-radius: 5px 5px 0 0;
    }
    &:last-child{
        border-radius: 0 0 5px 5px;
    }
}
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
`;

export default Results;