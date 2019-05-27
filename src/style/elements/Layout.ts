import styled, { css } from 'styled-components';
import { headerHeightInRem, above } from '../utilities';

interface TableCellWrapperProps {
    widthInPercent: number
    verticalAlign?: string
    customColor?: string
}

export const TableCellWrapper = styled.div<TableCellWrapperProps>`
    display: table-cell;
    vertical-align: ${({ verticalAlign }) => verticalAlign ? verticalAlign : "middle"};
    width: ${({ widthInPercent }) => widthInPercent}%;
    ${({ customColor }) => customColor ? css`color: ${customColor}` : ''}
`;

export const GridWrapper = styled.div<{ gridTemplateColumns: string }>`
display: grid;
grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
`

export const Container = styled.div`
padding: ${headerHeightInRem}rem 1rem 0;
${above.custom(460)}{
padding: ${headerHeightInRem}rem 2rem 0;
}
${above.custom(1100)}{
    padding: ${headerHeightInRem}rem 4.5rem 0;
}
${above.custom(1400)}{
    padding: ${headerHeightInRem}rem 5.3125rem 0;
}
`

export const Divider = styled.div`
background: #EDEDED;
height: 1px; 
width: 100%
`;