import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    pollId: string
}

const Wrapper = styled.div`
max-width: inherit;
width: 100%;
height: 92vh;
position: fixed;
bottom: 0px;
background: indigo;
color: #fff;
`
class SideNav extends React.Component<Props> {
    render() {
        return (
            <Wrapper>
                <div>
                    <div style={{ marginTop: "20rem", width: "100%", textAlign: "center", display: "inline-block" }}>
                        <Link className="unstyled-link" to={`/poll/${this.props.pollId}/`}>Overview</Link>
                    </div>
                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                        <Link className="unstyled-link" to={`/poll/${this.props.pollId}/results`}>Results</Link>
                    </div>
                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center" }}>
                        <Link className="unstyled-link" to={`/poll/${this.props.pollId}/settings`}>Settings</Link>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default SideNav;