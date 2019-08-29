import React, { useState } from 'react';
import styled from 'styled-components';
import { IPollQuery, IUser } from '../../../interfaces';
import { Heading, SecondaryButton, Label, PrimaryButton } from '../../../style/elements';
import { headerHeightInRem, above } from '../../../style/utilities';
import InviteIcon from '../../../images/invite-icon.svg';
import ExpandButton from '../../../style/elements/Expand';
import UserDropdownMenu from './UserDropdownMenu';
import { Flex, Box } from '@rebass/grid';
import Media from 'react-media';
import Burger from '../../../images/burger.svg'
import InviteModal from './InviteModal';
import AuthModal from '../AuthModal';

interface Props {
    poll: IPollQuery
    pseudonym: string
    toggleMobileNav: () => void
    user: IUser
    className?: string
}

const Header = ({ poll, pseudonym, className, toggleMobileNav, user }: Props) => {

    const [showDescription, setShowDescription] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    return (
        <Flex className={className} flexWrap="wrap">
            <Box width={1}>
                <Flex>
                    <Media query={above.lg.replace('@media ', '')}>
                        {matches => !matches && <BoxWrapper width='auto'>
                            <img src={Burger} id='burger' onClick={toggleMobileNav} />
                        </BoxWrapper>}
                    </Media>
                    <BoxWrapper width='auto'>
                        <Flex>
                            <BoxWrapper width='auto'>
                                <Heading>
                                    {poll.title}
                                </Heading>
                            </BoxWrapper>
                            <BoxWrapper width='auto'>
                                <ExpandButton clicked={showDescription} onClick={// tslint:disable-next-line jsx-no-lambda
                                    () => setShowDescription(!showDescription)} alt="show description" />
                            </BoxWrapper>
                        </Flex>
                    </BoxWrapper>
                    <Media query={above.lg.replace('@media ', '')}>
                        {matches => matches && <React.Fragment>

                            <BoxWrapper flex={1}>
                                <InviteModal isOpen={inviteOpen} setIsOpen={setInviteOpen} url={`https://daccordapp.com/poll/${poll.refId}/`} />
                                <BoxEnd>
                                    <SecondaryButton onClick={// tslint:disable-next-line jsx-no-lambda
                                        () => setInviteOpen(true)}><img src={InviteIcon} /> <p>Invite</p> </SecondaryButton>
                                </BoxEnd>
                            </BoxWrapper>
                            <BoxWrapper width="auto">
                                <BoxEnd>
                                    {user.id ? <UserDropdownMenu pseudonym={pseudonym} /> : <AuthModal isOpen={false} renderButton={true} poll={poll} />}
                                </BoxEnd>
                            </BoxWrapper>
                        </React.Fragment>
                        }
                    </Media>
                </Flex>
            </Box>

            {showDescription &&
                <Box width={1}>
                    <Label>
                        Description
                </Label>
                    <p>{poll.description} </p>
                </Box>
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
padding: 0 1.625rem;
${above.lg}{
    max-width: ${11 / 12 * 100}%;
    padding: 0 3.625rem;
}
box-shadow: 0px 2px 4px rgba(104, 104, 104, 0.25);
background-color: #FFF;
z-index: 10;
${Heading}{
    margin: 0 1rem 0 0;
    font-size: .9rem;
    ${above.custom(420)}{
    font-size: 1.25rem;
    }
    ${above.lg}{
       font-size: 1.75rem;
    }
}
#burger{
    margin-right: 1rem;
    cursor: pointer;
}
button{
    width: 7rem; 
    p{
        display: inline-block;
        margin: 0 0 0 0.4rem;
    }
}
${PrimaryButton}{
    width: auto;
    margin: 0;
}
`;