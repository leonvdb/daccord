import React from 'react'
import SVG from 'react-inlinesvg';
import Home from '../../../images/home.svg'
import Results from '../../../images/results.svg'
import Settings from '../../../images/settings.svg'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { white } from '../../../style/utilities';
import { TableCellWrapper, SmallHeading } from '../../../style/elements';
import { Box, Flex } from '@rebass/grid';


interface Props {
    iconName: string
    to: string
    active: boolean
    mobile?: boolean
}

const NavigationIcon = (props: Props) => {
    const icons = {
        "home": Home,
        "results": Results,
        "settings": Settings
    }
    const src = icons[props.iconName]
    if (props.mobile) {
        return (
            <Link to={props.to}>
                <Wrapper active={props.active} mobile={true}>
                    <Flex flexWrap="wrap">
                        <Box width={2 / 7}>
                            <SVG src={src} />
                        </Box>
                        <Box width={5 / 7}>
                            <SmallHeading>{props.iconName[0].toUpperCase() + props.iconName.slice(1)}</SmallHeading>
                        </Box>
                    </Flex>
                </Wrapper>
            </Link>
        )

    } else return (
        <Link to={props.to}>
            <Wrapper active={props.active}>
                <TableCellWrapper widthInPercent={100}>
                    <SVG src={src} />
                </TableCellWrapper>
            </Wrapper>
        </Link>
    )
}

const Wrapper = styled.div<{ active: boolean, mobile?: boolean }>`
width: 100%;
height: 3.5rem;
display: table;
svg{
    height: 1.5rem;
}
${({ mobile, active }) => mobile && css`
    display: inline-block;
    text-align: left;
    h5{
        margin: .3rem 0 0 .5rem;
        color: ${active ? '#5D5ACF' : 'white'}  
    }
    svg{
        height: 1.25rem;
        width: 1.25rem;
        margin-left: 1.125rem;
    }
    `}
path, circle, rect{
${({ active }) => active ? '' : css`stroke: ${white}`}
transition: stroke .5s ease 0s
}
`;

export default NavigationIcon
