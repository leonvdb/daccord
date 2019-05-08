import styled from 'styled-components';
import { headerHeightInRem } from '../utilities';

interface TableCellWrapperProps {
    widthInPercent: number
    verticalAlign?: string
}

export const TableCellWrapper = styled.div<TableCellWrapperProps>`
    display: table-cell;
    vertical-align: ${({ verticalAlign }) => verticalAlign ? verticalAlign : "middle"};
    width: ${({ widthInPercent }) => widthInPercent}%;
`;

export const Container = styled.div`
padding: ${headerHeightInRem}rem 5.3125rem 0;
`

export const Divider = styled.div`
background: #EDEDED;
height: 1px; 
width: 100%
`;