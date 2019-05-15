import styled from 'styled-components';
import { blackBlue, black, label, heading, headingTwo, darkPurple, largeLable, darkerGray, smallHeading, darkGray, smallLabel, smallerLabel } from '../utilities';

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
${largeLable}
`;

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