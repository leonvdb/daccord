import React, { useState } from 'react';
import styled from 'styled-components';
import { IPollQuery } from '../../../interfaces';
import { Heading, SecondaryButton, Label } from '../../../style/elements';
import { headerHeightInRem, above } from '../../../style/utilities';
import InviteIcon from '../../../images/invite-icon.svg';
import ExpandButton from '../../../style/elements/Expand';
import UserDropdownMenu from './UserDropdownMenu';
import { Flex, Box } from '@rebass/grid';

interface Props {
    poll: IPollQuery
    pseudonym: string
    className?: string
}

const Header = ({ poll, pseudonym, className }: Props) => {

    const [showDescription, setShowDescription] = useState(false);
    return (
        <Flex className={className} flexWrap='wrap'>
            <BoxWrapper width={6 / 10}>
                <div>
                    <Heading>
                        {poll.title}
                    </Heading>
                    <ExpandButton clicked={showDescription} onClick={// tslint:disable-next-line jsx-no-lambda
                        () => setShowDescription(!showDescription)} alt="show description" />
                </div>
            </BoxWrapper>
            <BoxWrapper flex={1}>
                <BoxEnd>
                    <SecondaryButton><img src={InviteIcon} /> <p>Invite</p> </SecondaryButton>
                </BoxEnd>
            </BoxWrapper>
            <BoxWrapper width="auto">
                <BoxEnd>
                    <UserDropdownMenu pseudonym={pseudonym} poll={poll} />
                </BoxEnd>
            </BoxWrapper>
            {showDescription &&
                <div className="table-row">
                    <Label>
                        Description
                </Label>
                    <p>{poll.description} </p>
                </div>
            }
        </Flex>
    )
}

const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${headerHeightInRem}rem;
`;

const BoxEnd = styled(Box)`
display: flex;
flex-direction: row;
width: 100%;
justify-content: flex-end;
`

export default styled(Header)`
position: fixed;
width: 100%;
max-width: 100%;
${above.lg}{
    max-width: ${11 / 12 * 100}%;
}
box-shadow: 0px 2px 4px rgba(104, 104, 104, 0.25);
background-color: #FFF;
padding: 0 3.625rem;
z-index: 1;
${Heading}{
    margin: 0 1rem 0 0;
}
button{
    width: 7rem; 
    p{
        display: inline-block;
        margin: 0 0 0 0.4rem;
    }
}
`;