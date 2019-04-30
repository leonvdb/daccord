import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import { lightGray } from '../../../style/utilities';

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
            <VotingNumber onMouseEnter={// tslint:disable-next-line jsx-no-lambda
                () => { setCurrent(0) }}
                onMouseLeave={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(props.userRating) }}
            >0</VotingNumber>
            <VotingNumber onMouseEnter={// tslint:disable-next-line jsx-no-lambda
                () => { setCurrent(1) }}
                onMouseLeave={// tslint:disable-next-line jsx-no-lambda
                    () => { setCurrent(props.userRating) }}

            >1</VotingNumber>
            <VotingNumber>2</VotingNumber>
            <VotingNumber>3</VotingNumber>
            <VotingNumber>4</VotingNumber>
            <VotingNumber>5</VotingNumber>
            <VotingNumber>6</VotingNumber>
            <VotingNumber>7</VotingNumber>
            <VotingNumber>8</VotingNumber>
            <VotingNumber>9</VotingNumber>
            <VotingNumber>10</VotingNumber>
        </div>
    )
}
const ColoredBarStyle = {
    "0": css`
    width: 1.375rem;
    background: #22C21E;
    `,
    "1": css`
    width: ${1.375 + 1 * 1.75}rem;
    background: linear-gradient(270deg, #51CF23 0%, rgba(81, 207, 35, 0.63) 100%);
    `
}

interface ColoredBarProps {
    current?: number
}

const VotingNumber = styled.span`
border: solid 2px ${lightGray};
width: 1.375rem;
height: 1.375rem;
margin-right: .375rem;
border-radius: 50%;
text-align: center;
display: table-cell;
font-size: 0.75rem;
font-weight: 500;
position: relative;
color: ${lightGray};
z-index: 1;
`

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