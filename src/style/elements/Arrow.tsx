import React from 'react'
import ArrowGrayLeft from '../../images/arrow-gray-left.svg';
import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';
import { primaryStrong } from '../utilities';

interface Props {
    className?: string
    direction?: string
    onClick?: () => void
    active: boolean
}

const Arrow = (props: Props) => {
    return (
        <Wrapper direction={props.direction} active={props.active} onClick={props.onClick}>
            <SVG src={ArrowGrayLeft} />
        </Wrapper>
    )
}

const Wrapper = styled.div<{ direction?: string, active: boolean }>`
display: inline-block;
svg{
    ${({ direction }) => direction === "right" ? css`transform: rotate(180deg);` : ''}
    circle{
    ${({ active }) => active ? css`
    fill: ${primaryStrong};
    cursor: pointer;
        ` : ''}
    }
}
`

export default Arrow;
