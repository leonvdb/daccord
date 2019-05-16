import { css } from 'styled-components'

const fontWeights = {
    light: 300,
    medium: 500
}

export const heading = css`
font-size: 1.75rem;
font-weight: ${fontWeights.medium};
`

export const smallHeading = css`
font-size: 1.125rem;
font-weight: ${fontWeights.medium};
`

export const headingTwo = css`
font-size: 1.125rem;
font-weight: normal;
`

export const buttonLabel = css`
font-size: 0.9375rem;
font-weight: ${fontWeights.medium};
`;

export const label = css`
font-size: 1.125rem;
font-weight: ${fontWeights.light};
`

export const largeLabel = css`
font-size: 3rem;
font-weight: normal;
`
export const mediumLabel = css`
font-size: 1.5rem;
font-weight: ${fontWeights.medium};
`

export const smallLabel = css`
font-size: 1rem; 
font-weight: bold;
`

export const smallerLabel = css`
font-size: .875rem; 
font-weight: ${fontWeights.medium};
`;

export const veryLarge = css`
font-weight: bold;
font-size: 2.5rem;
`;