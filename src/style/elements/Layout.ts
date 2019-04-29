import styled from 'styled-components';

interface TableCellWrapperProps {
    widthInPercent: number
}

export const TableCellWrapper = styled.div<TableCellWrapperProps>`
    display: table-cell;
    vertical-align: middle;
    width: ${({ widthInPercent }) => widthInPercent}%;
`;