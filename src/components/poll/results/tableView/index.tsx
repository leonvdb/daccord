import React, { useState } from 'react'
import { Query } from 'react-apollo';
import { GET_INDIVIDUAL_VOTES } from '../../../../graphql/getPoll';
import styled from 'styled-components';
import { TableCellWrapper, Label } from '../../../../style/elements';
import { darkGray } from '../../../../style/utilities';
import { IPollQuery, IUser, IOptionDetails } from '../../../../interfaces';
import ResultRow from '../ResultRow';
import ParticipantsRow from '../ParticipantsRow';
import Arrow from '../../../../style/elements/Arrow';


interface Props {
    poll: IPollQuery
    pseudonym: string
    user: IUser
    className?: string
}

const TableView = (props: Props) => {
    const { poll, user } = props;
    const [firstDisplayedParticipant, setFirstDisplayedParticipant] = useState(0)
    const userAndCreator = [{ id: user.id, pseudonym: "You" }]
    if (poll.creator.id !== user.id) {
        userAndCreator.push({ id: poll.creator.id, pseudonym: poll.creatorPseudonym })
    }
    const displayedParticipants = [...userAndCreator]
    let userInParticipants = -1
    const remainingSpace = 7 - displayedParticipants.length
    for (let i = firstDisplayedParticipant; i < remainingSpace; i++) {
        const participant = poll.participants[i]
        if (participant.user.id !== user.id) {
            const { user, pseudonym } = participant
            displayedParticipants.push({ id: user.id, pseudonym })
        } else {
            userInParticipants = i
        }
    }

    const goBack = () => {
        console.log("back")
    }
    const goForward = () => {
        setFirstDisplayedParticipant(firstDisplayedParticipant + 5)
        console.log("forward")
        console.log(userInParticipants);
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
                        <Arrow active={false} onClick={goBack} />
                        <Arrow direction="right" active={true} onClick={goForward} />
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
                    return (<OptionContainer>
                        <TableWrapper>
                            <ParticipantsRow displayedParticipants={displayedParticipants} />
                            {data.poll.options.map((option: IOptionDetails) => {
                                return <ResultRow option={option} key={`table-result-${option.refId}`} displayedParticipants={displayedParticipants} />
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
    background: white;
    text-align: center;
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

