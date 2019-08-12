import React, { useState } from 'react'
import { Query } from 'react-apollo';
import { GET_INDIVIDUAL_VOTES } from '../../../../graphql/getPoll';
import styled from 'styled-components';
import { TableCellWrapper, Label } from '../../../../style/elements';
import { darkGray } from '../../../../style/utilities';
import { IPollQuery, IUser, IExtededOptionDetails } from '../../../../interfaces';
import ResultRow from './ResultRow';
import ParticipantsRow from './ParticipantsRow';
import Arrow from '../../../../style/elements/Arrow';
import sortOptionsByAgreement from '../../../../utilities/sortOptionsByAgreement';


interface Props {
    poll: IPollQuery
    pseudonym: string
    user: IUser
    numberOfFields: number;
    className?: string
}

const TableView = (props: Props) => {
    const { poll, user, numberOfFields } = props;
    const [firstDisplayedParticipant, setFirstDisplayedParticipant] = useState(0)
    const allParticipants = []
    if (poll.creator.id !== user.id) {
        allParticipants.push({ id: poll.creator.id, pseudonym: poll.creatorPseudonym })
    }
    poll.participants.forEach(participant => {
        if (participant.user.id !== user.id) {
            const { user, pseudonym } = participant
            allParticipants.push({ id: user.id, pseudonym })
        }
    })
    const displayedParticipants = [{ id: user.id, pseudonym: "You" }, ...allParticipants.slice(firstDisplayedParticipant, firstDisplayedParticipant + (numberOfFields - 1))]
    const backAvailable = firstDisplayedParticipant > 0 ? true : false
    const forwardAvailable = firstDisplayedParticipant + (numberOfFields - 1) < allParticipants.length
    const goBack = () => {
        setFirstDisplayedParticipant(firstDisplayedParticipant - (numberOfFields - 1))
    }
    const goForward = () => {
        setFirstDisplayedParticipant(firstDisplayedParticipant + (numberOfFields - 1))
    }

    return (
        <div className={props.className}>
            <TableWrapper className="labels">
                <TableCellWrapper widthInPercent={29.29} verticalAlign="bottom">
                    <Label>Option</Label>
                </TableCellWrapper>
                <TableCellWrapper widthInPercent={70.71} verticalAlign="bottom">
                    <Label>Participants</Label>
                    <div className="arrows">
                        <Arrow active={backAvailable} onClick={backAvailable ? goBack : undefined} />
                        <Arrow direction="right" active={forwardAvailable} onClick={forwardAvailable ? goForward : undefined} />
                    </div>
                </TableCellWrapper>
            </TableWrapper>
            <Query query={GET_INDIVIDUAL_VOTES} variables={{ id: props.poll.refId }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) {
                        console.log({ error })
                        return <p>{error.message ? error.message.replace('GraphQL error: ', '') : 'Error :('}</p>
                    }
                    const sortedOptions = sortOptionsByAgreement(data.poll.options)
                    return (<OptionContainer>
                        <TableWrapper>
                            <ParticipantsRow displayedParticipants={displayedParticipants} numberOfFields={numberOfFields} />
                            {sortedOptions.map((option: IExtededOptionDetails) => {
                                return <ResultRow numberOfFields={numberOfFields} option={option} key={`table-result-${option.refId}`} displayedParticipants={displayedParticipants} user={props.user} />
                            })}
                        </TableWrapper>
                    </OptionContainer>)
                }}
            </Query>
        </div>
    )
}


const TableWrapper = styled.div`
display: table;
width: 100%;
`;

const OptionContainer = styled.div`
overflow: hidden;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
${TableWrapper}{
    text-align: center;
    background: white;
    ${ResultRow}{
        ${TableCellWrapper}:first-child{
            text-align: left;
        }
    }
    ${TableCellWrapper}{
    height: 4.5625rem;
    &:first-child{
        border-left: none;
    border-right: solid 2px ${darkGray};
    }
    &:nth-child(2){
        border-left: none;
    }
}
}
`;

export default styled(TableView)`
.labels{
    margin-bottom: 1.5rem; 
    ${Label}{
        margin-left: 1rem;
        display: inline-block;
    }
    .arrows{
        display: inline-block;
        margin-left: 1rem;
        svg:last-child{
            margin-left: .3rem;
        }

    }
}
`;

