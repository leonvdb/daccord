import React, { useState } from 'react';
import styled from 'styled-components';
import { IPollQuery } from '../../../interfaces';
import { Heading } from '../../../style/elements/Headings';
import { SecondaryButton } from '../../../style/elements/Buttons';
import { headerHeightInRem } from '../../../style/utilities/Position';
import Expand from '../../../images/expand.svg';

interface Props {
    poll: IPollQuery
    pseudonym: string
    className?: string
}

interface TableCellWrapperProps {
    widthInPercent: number
}

const TableCellWrapper = styled.div<TableCellWrapperProps>`
    display: table-cell;
    vertical-align: middle;
    width: ${({ widthInPercent }) => widthInPercent}%;
`;

const Header = ({ poll, pseudonym, className }: Props) => {

    const [showDescription, setShowDescription] = useState(false);
    return (
        <div className={className}>
            <TableCellWrapper widthInPercent={98}>
                <Heading>
                    {poll.title}
                </Heading>
                <img onClick={// tslint:disable-next-line jsx-no-lambda
                    () => setShowDescription(!showDescription)}
                    src={Expand} alt="show description" />
            </TableCellWrapper>
            <TableCellWrapper widthInPercent={1}>
                <SecondaryButton>Invite</SecondaryButton>
            </TableCellWrapper>
            <TableCellWrapper widthInPercent={1}>
                <button>{pseudonym}</button>
            </TableCellWrapper>
            {showDescription && <p>Description: {poll.description} </p>}
        </div>
    )
}

export default styled(Header)`
position: fixed;
display: table;
width: 100%;
max-width: inherit;
box-shadow: 0px 2px 4px rgba(104, 104, 104, 0.25);
background-color: #FFF;
height: ${headerHeightInRem}rem;
padding: 0 3.625rem;
${Heading}{
    margin: 0;
}

`;