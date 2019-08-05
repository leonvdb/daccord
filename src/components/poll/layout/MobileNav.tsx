import React from 'react'
import styled from 'styled-components';
import { primary, veryLarge } from '../../../style/utilities';
import { UnstyledLink, ButtonLabel } from '../../../style/elements';
import InviteIcon from '../../../images/invite-icon-white.svg'
import { Box, Flex } from '@rebass/grid';
import UserDropdownMenu from './UserDropdownMenu';
import NavigationIcon from './NavigationIcon';

interface IProps {
    className?: string
    isOpen: boolean
    pseudonym: string;
}

const MobileNav = (props: IProps) => {
    const location = window.location.href.match(/\/poll\/[1-9A-Za-z]*/g)
    return (
        <div className={props.className} >
            <Logo to={'/'}>Logo</Logo>
            <FadeIn isOpen={props.isOpen}>
                <StyledFlex>
                    <Box width={3 / 8}>
                        <img src={InviteIcon} />
                    </Box>
                    <Box width={5 / 8}>
                        <StyledUserDropdownMenu pseudonym={props.pseudonym} />
                    </Box>
                </StyledFlex>
                <NavigationIcon iconName="settings" to={`${location ? location[0] : ""}/settings`} active={true} />
            </FadeIn>
        </div>
    )
}

const Logo = styled(UnstyledLink)`
${veryLarge};
position:relative;
top:.5rem;
`
const StyledFlex = styled(Flex)`
margin-top: 2rem;
`
const StyledUserDropdownMenu = styled(UserDropdownMenu)`
${ButtonLabel}{
color:white;
}
path{
    stroke: white;
}

`

const FadeIn = styled.div<{ isOpen: boolean }>`
opacity:0;
${({ isOpen }) => isOpen && 'opacity:1'}
transition: opacity ease-in-out .5s;
`

export default styled(MobileNav) <{ isOpen: boolean }>`
position: fixed;
text-align: center;
background: ${primary};
width: 0;
transition: width .4s ease-in-out;
height: 100vh;
${({ isOpen }) => isOpen && 'width: 18.25rem;'}
`
