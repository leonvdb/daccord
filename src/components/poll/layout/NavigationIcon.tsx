import React from 'react'
import SVG from 'react-inlinesvg';
import Home from '../../../images/home.svg'
import Results from '../../../images/results.svg'
import Settings from '../../../images/settings.svg'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { white } from '../../../style/utilities';
import { TableCellWrapper } from '../../../style/elements';


interface Props {
    iconName: string
    to: string
    active: boolean
}

const NavigationIcon = (props: Props) => {
    const icons = {
        "home": Home,
        "results": Results,
        "settings": Settings
    }
    const src = icons[props.iconName]
    return (
        <Link to={props.to}>
            <Wrapper active={props.active}>
                <TableCellWrapper widthInPercent={100}>
                    <SVG src={src} />
                </TableCellWrapper>
            </Wrapper>
        </Link>
    )
}

const Wrapper = styled.div<{ active: boolean }>`
width: 100%;
height: 3.5rem;
display: table;
svg{
    height: 1.5rem;
}
path, circle, rect{
${({ active }) => active ? '' : css`stroke: ${white}`}
transition: stroke .5s ease 0s
}
`;

export default NavigationIcon
