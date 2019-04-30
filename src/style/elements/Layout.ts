import styled from 'styled-components';

interface TableCellWrapperProps {
    widthInPercent: number
    verticalAlign?: string
}

export const TableCellWrapper = styled.div<TableCellWrapperProps>`
    display: table-cell;
    vertical-align: ${({ verticalAlign }) => verticalAlign ? verticalAlign : "middle"};
    width: ${({ widthInPercent }) => widthInPercent}%;
`;