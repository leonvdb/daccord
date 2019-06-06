import styled from 'styled-components';
import { blackBlue, black, label, heading, headingTwo, darkPurple, largeLabel, darkerGray, smallHeading, darkGray, smallLabel, smallerLabel, mediumLabel, buttonLabel, softBlack } from '../utilities';

export const Heading = styled.h1`
color: ${blackBlue};
display: inline-block;
${heading}
`

export const HeadingTwo = styled.h2`
color: ${black};
${headingTwo}
`;

export const SmallHeading = styled.h5`
color: ${darkerGray};
${smallHeading}
`;

export const LargeLabel = styled.h1`
color: ${darkPurple};
${largeLabel}
`;

export const MediumLabel = styled.h3`
color: ${black};
${mediumLabel}
`

export const Label = styled.h5`
color: #000000
${label}
`;

export const SmallLabel = styled.span`
color: ${darkGray};
${smallLabel}
`

export const SmallerLabel = styled.span`
color: ${darkGray};
${smallerLabel}
`

export const ButtonLabel = styled.h5`
margin-bottom: 0;
display: inline-block;
${buttonLabel}
`

export const InputLabel = styled.h5`
color: ${softBlack}
${smallerLabel}

`