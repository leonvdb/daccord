import React, { useState } from 'react';
import styled from 'styled-components';
import { IPollQuery } from '../../../interfaces';
import { Heading } from '../../../style/elements/Headings';
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
            <Heading>
                {poll.title}
            </Heading>
            <img onClick={// tslint:disable-next-line jsx-no-lambda
                () => setShowDescription(!showDescription)}
                src={Expand} alt="show description" />
            <button>{pseudonym}</button>
            {showDescription && <p>Description: {poll.description} </p>}
        </div>
    )
}

export default styled(Header)`
box-shadow: 0px 2px 4px rgba(104, 104, 104, 0.25);
height: 76px;
button{
    float: right;
}
`;