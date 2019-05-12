import styled from 'styled-components';
import { darkerGray, white, primaryStrong } from '../utilities'
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
`

export const ToggleButton = styled.div`
background-color: ${white};
border: 0.8px solid #5B39DC;
border-radius: 4px;
`