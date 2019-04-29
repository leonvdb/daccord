import * as React from 'react';
import styled from 'styled-components';
import { UnstyledLink } from '../../../style/elements/Link';
import { primary, white } from '../../../style/utilities/Colors';
import { fixedRelativeToParent } from '../../../style/utilities/Position';
import Plus from '../../../images/plus.svg';
import { Link } from 'react-router-dom';

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
                <UnstyledLink to={`/poll/${pollId}/`}>Overview</UnstyledLink>
            </PositionWrapper>
            <PositionWrapper topInPercent={50}>
                <UnstyledLink to={`/poll/${pollId}/results`}>Results</UnstyledLink>
            </PositionWrapper>
            <PositionWrapper topInPercent={60}>
                <UnstyledLink to={`/poll/${pollId}/settings`}>Settings</UnstyledLink>
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