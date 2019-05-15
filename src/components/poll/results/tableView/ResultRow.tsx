import React from 'react'
import { TableCellWrapper, SmallHeading } from '../../../../style/elements';
import styled from 'styled-components';
import { IUser, IExtededOptionDetails } from '../../../../interfaces';
import { scale, veryLarge, colorScale } from '../../../../style/utilities';
import CircularProgressBar from '../../layout/CircularProgressBar';

interface Props {
    className?: string
    option: IExtededOptionDetails
    displayedParticipants: Array<{ id: string, pseudonym: string }>
    user: IUser
}

const ResultRow = (props: Props) => {
    const { option, displayedParticipants } = props
    const participantsVotesDict = {}
    option.votes.forEach(vote => {
        participantsVotesDict[vote.voter.user.id] = vote.rating
    })
    const agreementColor = colorScale(100 - option.result.agreementInPercent)
    participantsVotesDict[props.user.id] = option.userRating ? option.userRating : undefined
    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29}>
                <CircularProgressBar percentage={option.result.agreementInPercent} color={agreementColor} sqSize={50} strokeWidth={5} />
                <SmallHeading>
                    {props.option.title}
                </SmallHeading>
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
${SmallHeading}{
    display: inline-block;
}
${CircularProgressBar}{
    margin: 0 1rem;
    text{
    font-size: .9em; 
    .percent-symbol{
        font-size: .9em;
    }
    }
}
${TableCellWrapper}{
    border-style: solid;
    border-color: #DDD;
    border-width: 0px 0px 1px 1px;
}
.rating{
    ${veryLarge}
}
`;
