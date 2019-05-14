import React from 'react'
import { TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';
import { IOptionDetails } from '../../../interfaces';
import { scale, veryLarge } from '../../../style/utilities';

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
            {[...Array(7).keys()].map((value, index) => {
                const participant = displayedParticipants[index]
                if (participant) {
                    const ratingColor: string | undefined = participantsVotesDict[participant.id] !== undefined ? scale[participantsVotesDict[participant.id]].solid : undefined;
                    return <TableCellWrapper widthInPercent={10} key={`rating-${option.refId}-${participant.id}`} customColor={ratingColor} className="rating">
                        {participantsVotesDict[participant.id] !== undefined ? participantsVotesDict[participant.id] : "-"}
                    </TableCellWrapper>
                } else {
                    return <TableCellWrapper widthInPercent={10} key={`rating-${option.refId}-${value}`} className="rating" />
                }
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
.rating{
    ${veryLarge}
}
`;
