import * as React from 'react';
import styled from 'styled-components';
import { UnstyledLink } from '../../../style/elements/Link';
import { primary, white } from '../../../style/utilities/Colors';
import { fixedRelativeToParent } from '../../../style/utilities/Position';

interface Props {
    pollId: string
    className?: string
}
const PositionWrapper= styled.div`
${fixedRelativeToParent({topInPercent: 50})}
`


const SideNav = ({ className, pollId }: Props) => {
    return (
        <div className={className}>
        <PositionWrapper>
                <UnstyledLink to={`/poll/${pollId}/`}>Overview</UnstyledLink>
        </PositionWrapper>
            <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                <UnstyledLink to={`/poll/${pollId}/results`}>Results</UnstyledLink>
            </div>
            <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                <UnstyledLink to={`/poll/${pollId}/settings`}>Settings</UnstyledLink>
            </div>
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