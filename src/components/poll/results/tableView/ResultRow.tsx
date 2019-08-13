import React from 'react'
import { TableCellWrapper, SmallHeading } from '../../../../style/elements';
import styled from 'styled-components';
import { IUser, IExtededOptionDetails } from '../../../../interfaces';
import { scale, veryLarge, colorScale, above } from '../../../../style/utilities';
import CircularProgressBar from '../../layout/CircularProgressBar';
import Media from 'react-media';
import { Flex, Box } from '@rebass/grid';

interface Props {
    className?: string
    option: IExtededOptionDetails
    displayedParticipants: Array<{ id: string, pseudonym: string }>
    user: IUser
    numberOfFields: number;
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
                <Flex>
                    <Box width={[3 / 7, 3 / 10, 3 / 10, 3 / 10, 2 / 8]}>
                        <Media queries={{
                            sm: above.sm.replace('@media ', ''),
                            md: above.md.replace('@media ', ''),
                            lg: above.lg.replace('@media ', '')
                        }} children={// tslint:disable-next-line jsx-no-lambda
                            ({ sm, md, lg }) => <CircularProgressBar percentage={option.result.agreementInPercent} color={agreementColor} sqSize={lg ? 50 : md ? 46 : sm ? 44 : 40} strokeWidth={5} />
                        } />
                    </Box>
                    <Box width={[4 / 7, 7 / 10, 7 / 10, 7 / 10, 6 / 8]} alignSelf="center">
                        <SmallHeading>
                            {props.option.title}
                        </SmallHeading>
                    </Box>
                </Flex>
            </TableCellWrapper>
            {[...Array(props.numberOfFields).keys()].map((value, index) => {
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
    font-size:.875rem;
    margin-bottom: 0;
}
${CircularProgressBar}{
    margin: 0 1rem;
    text{
    font-size: .7em; 
    .percent-symbol{
        font-size: .7em;
    }
    }
}
${above.sm}{
    ${SmallHeading}{
        font-size:1rem;
    }
    ${CircularProgressBar}{
        text{
    font-size: .9em; 
    .percent-symbol{
        font-size: .9em;
    }
    }
}
    }
    ${above.lg}{
        ${SmallHeading}{
        font-size:1.25rem;
    }}
${TableCellWrapper}{
    border-style: solid;
    border-color: #DDD;
    border-width: 0px 0px 1px 1px;
}
.rating{
    ${veryLarge}
}
`;
