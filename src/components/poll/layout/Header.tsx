import React, { useState } from 'react';
import styled from 'styled-components';
import { IPollQuery } from '../../../interfaces';
import { Heading, SecondaryButton, Label, TableCellWrapper } from '../../../style/elements';
import { headerHeightInRem } from '../../../style/utilities';
import Expand from '../../../images/expand.svg';
import InviteIcon from '../../../images/invite-icon.svg';

interface Props {
    poll: IPollQuery
    pseudonym: string
    className?: string
}

const Header = ({ poll, pseudonym, className }: Props) => {

    const [showDescription, setShowDescription] = useState(false);
    return (
        <div className={className}>
            <div className="table-row-1">
                <TableCellWrapper widthInPercent={98}>
                    <Heading>
                        {poll.title}
                    </Heading>
                    <img onClick={// tslint:disable-next-line jsx-no-lambda
                        () => setShowDescription(!showDescription)}
                        src={Expand} alt="show description" />
                </TableCellWrapper>
                <TableCellWrapper widthInPercent={1}>
                    <SecondaryButton><img src={InviteIcon} /> <p>Invite</p> </SecondaryButton>
                </TableCellWrapper>
                <TableCellWrapper widthInPercent={1}>
                    <button>{pseudonym}</button>
                </TableCellWrapper>
            </div>
            {showDescription &&
                <div className="table-row">
                    <Label>
                        Description
                </Label>
                    <p>{poll.description} </p>
                </div>
            }
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
padding: 0 3.625rem;
z-index: 1;
${Heading}{
    margin: 0 1rem 0 0;
}
button{
    p{
        display: inline-block;
        margin: 0 0 0 0.4rem;
    }
}
img{
    margin: 0 0 0.23rem 0;
}
.table-row-1{
    display: table-row;
    height: ${headerHeightInRem}rem
}
.table-row{
    display: table-row;
}

`;