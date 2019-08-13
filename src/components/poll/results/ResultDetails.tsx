import * as React from 'react';
import { IOptionQuery, IUser, IPollQuery } from '../../../interfaces';
import CircularProgressBar from '../layout/CircularProgressBar';
import { colorScale, scale, veryLarge, above } from '../../../style/utilities';
import styled from 'styled-components';
import { Divider, Label, PrimaryButton } from '../../../style/elements';
import TableWhite from '../../../images/table-white.svg';
import { Flex, Box } from '@rebass/grid';
interface Props {
    option: IOptionQuery
    poll: IPollQuery
    user: IUser
    rank: number
    setCurrentView: (viewType: string) => void
}

interface DetailsWrapperProps {
    userRatingColor?: string
}

const ResultDetails = (props: Props) => {

    const { option, rank } = props

    const { agreementInPercent, participationInPercent } = option.result
    const agreementColor = colorScale(100 - agreementInPercent)
    const participationColor = colorScale(100 - participationInPercent)
    const userRatingColor: string | undefined = option.userRating !== null ? scale[option.userRating].solid : undefined
    return (
        <div>
            <Divider />
            <DetailsWrapper data-testid="result-details" userRatingColor={userRatingColor}>
                <Flex flexWrap="wrap">
                    <StyledBox width={[1 / 2, 1 / 2, 1 / 8]} className="box">
                        <span className="rank">
                            {rank}
                        </span>
                        <Label>Rank</Label>
                    </StyledBox>
                    <StyledBox width={[1 / 2, 1 / 2, 1 / 8]} className="user-rating" data-testid="my-vote">
                        <span>
                            {option.userRating !== null ? option.userRating : '-'}
                        </span>
                        <Label>My Vote</Label>
                    </StyledBox>
                    <StyledBox width={[1 / 2, 1 / 2, 1 / 8]}>
                        <CircularProgressBar sqSize={62} strokeWidth={7} percentage={agreementInPercent ? agreementInPercent : 0} color={agreementColor} />
                        <Label>Agreement</Label>
                    </StyledBox>
                    <StyledBox width={[1 / 2, 1 / 2, 1 / 8]}>
                        <CircularProgressBar sqSize={62} strokeWidth={7} percentage={participationInPercent} color={participationColor} />
                        <Label>Participation</Label>
                    </StyledBox>
                    <StyledBox alignSelf="flex-end" flex={1}>
                        <PrimaryButton type="button" onClick={ // tslint:disable-next-line jsx-no-lambda
                            () => { props.setCurrentView('table') }}>Individual Votes <img src={TableWhite} /></PrimaryButton>
                    </StyledBox>
                </Flex>
            </DetailsWrapper>
        </div>
    )
}

const StyledBox = styled(Box)`
text-align:center;
margin-bottom: 1.5rem;
${above.md}{
    margin-bottom: 0;
}
`
const DetailsWrapper = styled.div<DetailsWrapperProps>`
padding: 1.4375rem 0;
${Label}{
    margin-top: 1rem;
}

${PrimaryButton}{
    margin: 0;
    ${above.md}{
    float: right;
    }
    padding: 0.5rem 0.8rem;
    img{
        margin-left: .7rem;
        margin-top: .23rem; 
    }
}
.rank{
    font-size: 2.5rem;
}
.user-rating{
    color: ${({ userRatingColor }) => userRatingColor};
    ${veryLarge}
}
`

export default ResultDetails;