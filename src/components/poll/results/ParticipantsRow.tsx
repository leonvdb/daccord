import React from 'react'
import { TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';
import { darkGray } from '../../../style/utilities';
import { IPollQuery, IUser } from '../../../interfaces';

interface Props {
    className?: string
    poll: IPollQuery
    pseudonym: string
    user: IUser
}
const ParticipantsRow = (props: Props) => {
    const { participants } = props.poll
    let currentUserSkipped = false
    const amountOfAvailableFields = props.poll.creator.id !== props.user.id ? 5 : 6;

    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29} />
            <TableCellWrapper widthInPercent={10}>
                You
            </TableCellWrapper>
            {props.poll.creator.id !== props.user.id && <TableCellWrapper widthInPercent={10}>
                {props.poll.creatorPseudonym}
            </TableCellWrapper>}
            {[...Array(amountOfAvailableFields).keys()].map(fieldId => {
                let index = fieldId;
                if (currentUserSkipped) {
                    index += 1;
                } else if (!currentUserSkipped && participants[fieldId]) {
                    if (participants[fieldId].user.id === props.user.id) {
                        currentUserSkipped = true;
                        index += 1;
                    }
                }
                return (<TableCellWrapper widthInPercent={10} key={`Participant-${fieldId}`}>
                    {participants[index] ? participants[index].pseudonym : ""}
                </TableCellWrapper>)
            })}
        </div>
    )
}

export default styled(ParticipantsRow)`
display: table-row;
${TableCellWrapper}{
    border-left: solid 1px #DDD;
    border-bottom: solid 2px ${darkGray};
    font-weight: 500;
}
`;
