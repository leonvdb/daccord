import React from 'react'
import SVG from 'react-inlinesvg';
import Home from '../../../images/home.svg'
import Results from '../../../images/results.svg'
import Settings from '../../../images/settings.svg'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { white } from '../../../style/utilities';


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

    console.log({ src })

    return (
        <Link to={props.to}>
            <Wrapper active={props.active}>
                <SVG src={src} />
            </Wrapper>
        </Link>
    )
}

const Wrapper = styled.div<{ active: boolean }>`
height: 3.5rem;
path{
${({ active }) => active ? '' : css`stroke: ${white}`}
}
`;

export default NavigationIcon
