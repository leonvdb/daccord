import * as React from 'react';
import styled from 'styled-components';
import { UnstyledLink } from '../../../style/elements';
import { primary, white, fixedRelativeToParent } from '../../../style/utilities';
import Plus from '../../../images/plus.svg';
import { Link } from 'react-router-dom';
import NavigationIcon from './NavigationIcon';

interface Props {
    pollId: string
    className?: string
}

interface PositionWrapperProps {
    topInPercent: number
}

const PositionWrapper = styled.div<PositionWrapperProps>`
${({ topInPercent }) => fixedRelativeToParent({ topInPercent })}
`


const SideNav = ({ className, pollId }: Props) => {
    return (
        <div className={className}>
            <PositionWrapper topInPercent={10}>
                <UnstyledLink to={'/'}>Logo</UnstyledLink>
            </ PositionWrapper>
            <PositionWrapper topInPercent={40}>
                <NavigationIcon iconName="home" to={`/poll/${pollId}/`} active={false} />
            </PositionWrapper>
            <PositionWrapper topInPercent={50}>
                <NavigationIcon iconName="results" to={`/poll/${pollId}/results`} active={false} />
            </PositionWrapper>
            <PositionWrapper topInPercent={60}>
                <NavigationIcon iconName="settings" to={`/poll/${pollId}/settings`} active={false} />
            </PositionWrapper>
            <PositionWrapper topInPercent={92}>
                <Link to={'/create'}>
                    <img src={Plus} alt="Create Poll" />
                </Link>
            </PositionWrapper>
        </div>
    )
}

export default styled(SideNav)`
text-align: center;
max-width: inherit;
width: 100%;
height: 100%;
position: fixed;
bottom: 0px;
background: ${primary};
color: ${white};
`