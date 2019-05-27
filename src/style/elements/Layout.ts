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
${above.lg}{
padding: ${headerHeightInRem}rem 5.3125rem 0;
}
${above.md}{
    padding: ${headerHeightInRem}rem 4rem 0;
}
${above.custom('min', 460)}{
padding: ${headerHeightInRem}rem 2rem 0;
}
padding: ${headerHeightInRem}rem 1rem 0;

`

export const Divider = styled.div`
background: #EDEDED;
height: 1px; 
width: 100%
`;