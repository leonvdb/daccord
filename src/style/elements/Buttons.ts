import styled, { css } from 'styled-components';
import { darkerGray, white, primaryStrong, lightRed, smallParagraph } from '../utilities'
import { buttonLabel } from '../utilities'

export const PrimaryButton = styled.button`
color: ${white};
padding: 0.5rem 1.75rem;
background-color: ${primaryStrong};
text-decoration: none;
border: none;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 4px;
margin: 0 1.625rem;
${buttonLabel};
font-size: 1.125rem;
white-space: nowrap;
`

export const SecondaryButton = styled.button`
color: ${darkerGray};
padding: 0.7rem 1rem;
background-color: ${white};
text-decoration: none;
border: none;
box-shadow: 0px 1.69167px 6.76667px rgba(104, 104, 104, 0.25);
border-radius: 4px;
margin: 0 1.625rem;
${buttonLabel};
white-space: nowrap;
`;

export const SettingsButton = styled.button`
text-decoration: underline;
border: none;
background: none;
color: ${lightRed};
padding: 0;
${smallParagraph}
text-align: left;
`

export const ToggleViewButton = styled.div<ToggleViewButtonProps>`
display: flex;
background-color: ${white};
border: 0.8px solid #5B39DC;
border-radius: 4px;
div{
    cursor: pointer;
}
svg{
    rect{
        fill: ${primaryStrong}
    }
    .only-stroke{
        fill: none;
        stroke: ${primaryStrong}
    }

    margin: 0.5rem;
}
${({ currentView }) => focusedToggle(currentView)}
`;

const focusedToggle = (currentView: string) => css`
.${currentView}-select{
    background: ${primaryStrong};
    cursor: auto;
    svg{
        rect{
            fill: ${white};
        }
        .only-stroke{
            fill: none;
            stroke: ${white};
        }
    }
}`;

interface ToggleViewButtonProps {
    currentView: string
}