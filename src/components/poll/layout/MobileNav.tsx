import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { primary, veryLarge } from '../../../style/utilities';
import { UnstyledLink, ButtonLabel } from '../../../style/elements';
import InviteIcon from '../../../images/invite-icon-white.svg'
import { Box, Flex } from '@rebass/grid';
import UserDropdownMenu from './UserDropdownMenu';
import NavigationIcon from './NavigationIcon';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<any> {
    className?: string
    isOpen: boolean
    pseudonym: string;
    toggleMobileNav: () => void;
}


const MobileNav = (props: IProps) => {
    const pollUrl = props.location.pathname.match(/\/poll\/[1-9A-Za-z]*/g)
    const [focus, setFocus] = useState("home")

    useEffect(() => {
        if (location.pathname.includes('results')) {
            setFocus('results');
        } else if (location.pathname.includes('settings')) {
            setFocus('settings');
        } else {
            setFocus('home');
        }
    })
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
                <Navigation>
                    <NavigationIcon iconName="home" to={`${pollUrl ? pollUrl[0] : ""}/`} active={focus === "home"} mobile={true} onClick={props.toggleMobileNav} />
                    <NavigationIcon iconName="results" to={`${pollUrl ? pollUrl[0] : ""}/results`} active={focus === "results"} mobile={true} onClick={props.toggleMobileNav} />
                    <NavigationIcon iconName="settings" to={`${pollUrl ? pollUrl[0] : ""}/settings`} active={focus === "settings"} mobile={true} onClick={props.toggleMobileNav} />
                </Navigation>
            </FadeIn>
        </div>
    )
}

const Navigation = styled.div`
margin-top:2rem;
`

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

const StyledMobileNav = styled(MobileNav) <{ isOpen: boolean }>`
position: fixed;
text-align: center;
background: ${primary};
width: 0;
transition: width .4s ease-in-out;
height: 100vh;
${({ isOpen }) => isOpen && 'width: 18.25rem;'}
`

export default withRouter(StyledMobileNav);
