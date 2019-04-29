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

const Header = ({ poll, pseudonym, className }: Props) => {

    const [showDescription, setShowDescription] = useState(false);
    return (
        <div className={className}>
            <div className="center-children-vertically">
                <Heading>
                    {poll.title}
                </Heading>
                <img onClick={// tslint:disable-next-line jsx-no-lambda
                    () => setShowDescription(!showDescription)}
                    src={Expand} alt="show description" />
            </div>
            <div className="center-children-vertically">
                <button>{pseudonym}</button>
            </div>
            <div className="center-children-vertically">
                <SecondaryButton>Invite</SecondaryButton>
            </div>
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
.center-children-vertically{
    display: table-cell;
    vertical-align: middle;
}
.float-right{
    float: right;
}
button{
    float: right;
}
${Heading}{
    margin: 0;
}

`;