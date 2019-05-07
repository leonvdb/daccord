import React, { useState } from 'react';
import { IOptionQuery, IUser, IPollQuery } from '../../../interfaces';
import ResultDetails from './ResultDetails';
import { colorScale, lightGray } from '../../../style/utilities';
import styled from 'styled-components';

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
            <div className="clearfix">
                <p onClick={toggle} style={{ marginBottom: "0", display: "inline-block" }}>{option.title}</p>
                <p style={{ marginBottom: "0", float: "right", display: "inline-block" }}>{option.result.agreementInPercent ? option.result.agreementInPercent : 0}% agreement</p>
            </div>
            <AgreementBar agreementInPercent={option.result.agreementInPercent} backgroundColorInHex={color} />
            <RemainderBar agreementInPercent={option.result.agreementInPercent} />
            {/* <button onClick={toggle}>Details</button> */}
            {showDetails && <ResultDetails option={option} poll={poll} user={user} rank={rank} />}
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
background-color: ${lightGray};
display: inline-block;
`;

const AgreementBar = styled.div<AgreementBarProps>`
width: ${({ agreementInPercent }) => `${agreementInPercent ? agreementInPercent : 0}%`};
height: .625rem;
background-color: ${({ backgroundColorInHex }) => backgroundColorInHex};
display: inline-block;
`

export default styled(ResultElement)`
min-height: 4rem;
width: 100%;
background: white;
padding: 0 1.5rem;
`;