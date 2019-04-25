import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { primary } from '../../../style/utilities/Colors'

interface Props {
    pollId: string
    className?: string
}


const SideNav = ({className, pollId}: Props) => {
    return (
        <div className={className}>
            <div style={{ marginTop: "20rem", width: "100%", textAlign: "center", display: "inline-block" }}>
                <Link className="unstyled-link" to={`/poll/${pollId}/`}>Overview</Link>
            </div>
            <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                <Link className="unstyled-link" to={`/poll/${pollId}/results`}>Results</Link>
            </div>
            <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                <Link className="unstyled-link" to={`/poll/${pollId}/settings`}>Settings</Link>
            </div>
        </div>
    )
}

export default styled(SideNav)`
max-width: inherit;
width: 100%;
height: 92vh;
position: fixed;
bottom: 0px;
background: ${primary};
color: #fff;
`