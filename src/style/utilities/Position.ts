import { css, FlattenSimpleInterpolation } from 'styled-components'
export const fixedRelativeToParent = ({ topInPercent = 0 } = {}): FlattenSimpleInterpolation => css`
    width: 100%;
    max-width: inherit;
    position: fixed;
    top: ${topInPercent}%
`