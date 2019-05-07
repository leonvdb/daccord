import React, { useState } from 'react';
import { IOptionQuery, IUser, IPollQuery } from '../../../interfaces';
import ResultDetails from './ResultDetails';
import { colorScale, lighterGray } from '../../../style/utilities';
import styled from 'styled-components';
import { SmallHeading, TableCellWrapper, SmallLabel, SmallerLabel } from '../../../style/elements';

interface Props {
    option: IOptionQuery
    poll: IPollQuery
    user: IUser
    rank: number
    className?: string
}

const ResultElement = (props: Props) => {
    const [showDetails, setShowDetails] = useState(false)
    const toggle = () => { setShowDetails(!showDetails) }
    const color = colorScale(100 - props.option.result.agreementInPercent)

    const { option, poll, user, rank } = props
    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={100}>
                <div className="clearfix">
                    <SmallHeading onClick={toggle}>{option.title}</SmallHeading>
                    <div className="float-right">
                        <SmallLabel>{option.result.agreementInPercent ? option.result.agreementInPercent : 0}%</SmallLabel>
                        <SmallerLabel>Agreement</SmallerLabel>
                    </div>
                </div>
                <AgreementBar agreementInPercent={option.result.agreementInPercent} backgroundColorInHex={color} />
                <RemainderBar agreementInPercent={option.result.agreementInPercent} />
                {/* <button onClick={toggle}>Details</button> */}
                {showDetails && <ResultDetails option={option} poll={poll} user={user} rank={rank} />}
            </TableCellWrapper>
        </div>
    )

}

interface AgreementBarProps {
    agreementInPercent: number
    backgroundColorInHex: string
}
interface RemainderBarProps {
    agreementInPercent: number
}


const RemainderBar = styled.div<RemainderBarProps>`
width: ${({ agreementInPercent }) => `${agreementInPercent ? 100 - agreementInPercent : 100}%`};
height: .625rem;
background-color: ${lighterGray};
display: inline-block;
border-radius: 0 2px 2px 0;
`;

const AgreementBar = styled.div<AgreementBarProps>`
width: ${({ agreementInPercent }) => `${agreementInPercent ? agreementInPercent : 0}%`};
height: .625rem;
background-color: ${({ backgroundColorInHex }) => backgroundColorInHex};
display: inline-block;
border-radius: 2px 0 0 2px;
`

export default styled(ResultElement)`
display: table; 
min-height: 4rem;
width: 100%;
background: white;
padding: 0 1.5rem;
font-size: 0;
${SmallHeading}{
    display: inline-block;
    margin-bottom: 0;
}
.float-right{
    float: right;
}
`;