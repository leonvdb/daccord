import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { primary, white, fixedRelativeToParent } from '../../../style/utilities';
import Plus from '../../../images/plus.svg';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import NavigationIcon from './NavigationIcon';
import Logo from "../../../images/logo-symbol.svg"

interface Props extends RouteComponentProps<any> {
    pollId: string
    className?: string
}

interface PositionWrapperProps {
    topInPercent: number
}

const PositionWrapper = styled.div<PositionWrapperProps>`
${({ topInPercent }) => fixedRelativeToParent({ topInPercent })}
`


const SideNav = ({ className, pollId, location }: Props) => {
    const [focusBlockPosition, setFocusBlockPosition] = useState(38.4)
    const iconPositions = {
        home: 38.4,
        results: 45.66,
        settings: 52.89
    }

    useEffect(() => {
        if (location.pathname.includes('results')) {
            setFocusBlockPosition(iconPositions.results);
        } else if (location.pathname.includes('settings')) {
            setFocusBlockPosition(iconPositions.settings);
        } else {
            setFocusBlockPosition(iconPositions.home);
        }
    })

    return (
        <div className={className}>
            <PositionWrapper topInPercent={focusBlockPosition}>
                <FocusBlock />
            </PositionWrapper>
            <PositionWrapper topInPercent={4}>
                <LogoLink to={'/'}><img src={Logo} /></LogoLink>
            </ PositionWrapper>
            <PositionWrapper topInPercent={iconPositions.home}>
                <NavigationIcon iconName="home" to={`/poll/${pollId}/`} active={focusBlockPosition === iconPositions.home} />
            </PositionWrapper>
            <PositionWrapper topInPercent={iconPositions.results}>
                <NavigationIcon iconName="results" to={`/poll/${pollId}/results`} active={focusBlockPosition === iconPositions.results} />
            </PositionWrapper>
            <PositionWrapper topInPercent={iconPositions.settings}>
                <NavigationIcon iconName="settings" to={`/poll/${pollId}/settings`} active={focusBlockPosition === iconPositions.settings} />
            </PositionWrapper>
            <PositionWrapper topInPercent={92}>
                <Link to={'/create'}>
                    <img src={Plus} alt="Create Poll" />
                </Link>
            </PositionWrapper>
        </div>
    )
}

const FocusBlock = styled.div`
height: 3.5rem;
width: 104%;
background: ${white};
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 0px 10px 10px 0px;
`

const LogoLink = styled(Link)`
img{
height: 2.5rem;
}
`

const styledSideNav = styled(SideNav)`
${PositionWrapper}{
    transition: top .5s ease 0s;
}
text-align: center;
max-width: ${1 / 12 * 100}%;
width: 100%;
height: 100%;
position: fixed;
bottom: 0px;
background: ${primary};
color: ${white};
`

export default withRouter(styledSideNav);