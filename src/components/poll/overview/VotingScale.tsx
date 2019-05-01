import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import { lightGray, scale } from '../../../style/utilities';

interface Props {
    className?: string
    userRating?: number
}

const VotingScale = (props: Props) => {
    const [current, setCurrent] = useState(props.userRating);
    console.log(current)
    return (
        <div className={props.className} >
            <ColoredBar current={current} />
            <VotingNumber fieldNumber={0} current={current}
                onMouseEnter={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(0) }}
                onMouseLeave={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(props.userRating) }}
            >0</VotingNumber>
            <VotingNumber fieldNumber={1} current={current}
                onMouseEnter={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(1) }}
                onMouseLeave={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(props.userRating) }}

            >1</VotingNumber>
            <VotingNumber fieldNumber={2} >2</VotingNumber>
            <VotingNumber fieldNumber={3} >3</VotingNumber>
            <VotingNumber fieldNumber={4} >4</VotingNumber>
            <VotingNumber fieldNumber={5} >5</VotingNumber>
            <VotingNumber fieldNumber={6} >6</VotingNumber>
            <VotingNumber fieldNumber={7} >7</VotingNumber>
            <VotingNumber fieldNumber={8} >8</VotingNumber>
            <VotingNumber fieldNumber={9} >9</VotingNumber>
            <VotingNumber fieldNumber={10} >10</VotingNumber>
        </div>
    )
}
const ColoredBarStyle = {
    "0": css`
    width: 1.375rem;
    background: ${scale[0].solid};
    `,
    "1": css`
    width: ${1.375 + 1 * 1.75}rem;
    background: ${scale[1].linear};
    `
}

interface ColoredBarProps {
    current?: number
}

interface VotingNumberProps {
    fieldNumber: number
    current?: number
}

const VotingNumber = styled.span<VotingNumberProps>`
border: solid 2px ${lightGray};
width: 1.375rem;
height: 1.375rem;
margin-right: .375rem;
border-radius: 50%;
text-align: center;
display: table-cell;
font-size: 0.75rem;
font-weight: 500;
color: ${lightGray};
position: relative;
z-index: 1;
${({ current, fieldNumber }) => current === fieldNumber ? css`
border: solid 2px ${scale[current].solid};
color: ${scale[current].solid};
font-weight: bold;
background-color: white;
` : current !== undefined && current > fieldNumber ? css`
color: white;
border: solid 2px rgba(0,0,0,0);
` : ""}

`;


const ColoredBar = styled.div<ColoredBarProps>`
margin-left: .375rem;
height: 1.375rem;
position: absolute;
border-radius: 30px;
width: 0;
${({ current }) => current !== undefined && ColoredBarStyle[current]};

`

export default styled(VotingScale)`
height: 1.375rem;
display: table;
border-spacing: .375rem;
border-collapse: separate;
vertical-align: middle;
`