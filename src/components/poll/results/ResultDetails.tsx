import * as React from 'react';
import { IOptionQuery, IUser, IPollQuery } from '../../../interfaces';
import CircularProgressBar from '../layout/CircularProgressBar';
import { colorScale, scale, veryLarge } from '../../../style/utilities';
import styled from 'styled-components';
import { Divider, TableCellWrapper, Label, PrimaryButton } from '../../../style/elements';
import TableWhite from '../../../images/table-white.svg';
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
                <div className="table">
                    <div className="table-row">
                        <TableCellWrapper widthInPercent={5} className="rank">
                            {rank}
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={8} className="user-rating" data-testid="my-vote">
                            {option.userRating !== null ? option.userRating : '-'}
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={10}>
                            <CircularProgressBar sqSize={62} strokeWidth={7} percentage={agreementInPercent ? agreementInPercent : 0} color={agreementColor} />
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={10}>
                            <CircularProgressBar sqSize={62} strokeWidth={7} percentage={participationInPercent} color={participationColor} />
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={67} />
                    </div>
                    <div className="table-row">
                        <TableCellWrapper widthInPercent={5} verticalAlign='bottom'><Label>Rank</Label></TableCellWrapper>
                        <TableCellWrapper widthInPercent={8} verticalAlign='bottom'><Label>My Vote</Label></TableCellWrapper>
                        <TableCellWrapper widthInPercent={10} verticalAlign='bottom'><Label>Agreement</Label></TableCellWrapper>
                        <TableCellWrapper widthInPercent={10} verticalAlign='bottom'><Label>Participation</Label></TableCellWrapper>
                        <TableCellWrapper className="float-right" widthInPercent={67} verticalAlign='bottom'>
                            <PrimaryButton type="button" onClick={ // tslint:disable-next-line jsx-no-lambda
                                () => { props.setCurrentView('table') }}>Individual Votes <img src={TableWhite} /></PrimaryButton>
                        </TableCellWrapper>
                    </div>
                </div>
            </DetailsWrapper>
        </div>
    )
}
const DetailsWrapper = styled.div<DetailsWrapperProps>`
padding: 1.4375rem 0;
${TableCellWrapper}{
    text-align: center;
}
${Label}{
    margin: 0;
}

${PrimaryButton}{
    padding: 0.5rem 0.8rem;
    img{
        margin-left: .7rem;
        margin-top: .23rem; 
    }
}

.float-right{
    float: right;
    text-align: right; 
    ${PrimaryButton}{
        margin: 0;
    }
}
.labels{
    ${TableCellWrapper}{
    height: 2rem;
}
}
.rank{
    font-size: 2.5rem;
}
.user-rating{
    color: ${({ userRatingColor }) => userRatingColor};
    ${veryLarge}
}
.table{
display: table;
margin: 0;
}
`

export default ResultDetails;