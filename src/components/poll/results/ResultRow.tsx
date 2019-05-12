import React from 'react'
import { TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';

interface Props {
    className?: string
}

const ResultRow = (props: Props) => {
    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29} />
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
            <TableCellWrapper widthInPercent={10}>
                Bla
                        </TableCellWrapper>
        </div>
    )
}

export default styled(ResultRow)`
display: table-row;
${TableCellWrapper}{
    border-style: solid;
    border-color: #DDD;
    border-width: 0px 0px 1px 1px;
}
`;
