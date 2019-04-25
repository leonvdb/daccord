import * as React from 'react';
import styled from 'styled-components';
import { UnstyledLink } from '../../../style/elements/Link';
import { primary, white } from '../../../style/utilities/Colors';

interface Props {
    pollId: string
    className?: string
}


const SideNav = ({ className, pollId }: Props) => {
    return (
        <div className={className}>
            <div style={{ marginTop: "20rem", width: "100%", textAlign: "center", display: "inline-block" }}>
                <UnstyledLink to={`/poll/${pollId}/`}>Overview</UnstyledLink>
            </div>
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
max-width: inherit;
width: 100%;
height: 100%;
position: fixed;
bottom: 0px;
background: ${primary};
color: ${white};
`