import React from 'react'
import { TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';
import { IOptionDetails } from '../../../interfaces';

interface Props {
    className?: string
    option: IOptionDetails
    displayedParticipants: Array<{ id: string, pseudonym: string }>
}

const ResultRow = (props: Props) => {
    const { option, displayedParticipants } = props
    const participantsVotesDict = {}
    option.votes.forEach(vote => {
        participantsVotesDict[vote.voter.user.id] = vote.rating
    })
    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29}>
                {props.option.refId}
            </TableCellWrapper>
            {displayedParticipants.map(participant => {
                return <TableCellWrapper widthInPercent={10} key={`rating-${option.refId}-${participant.id}`}>
                    {participantsVotesDict[participant.id] !== undefined ? participantsVotesDict[participant.id] : "-"}
                </TableCellWrapper>
            })}
        </div>
    )
}

export default styled(ResultRow)`
display: table-row;
${TableCellWrapper}{
    border-style: solid;
    border-color: #DDD;
    border-width: 0px 0px 1px 1px;
}
`;
