import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    pollId: string
}

class SideNav extends React.Component<Props> {
    render(){
        return (
            <div className="bg-secondary" style={{maxWidth: "inherit", width: "100%", height: "92vh", position: "fixed", bottom: "0px"}}>
                                <div>
                                    <div style={{ marginTop: "20rem", width: "100%", textAlign: "center", display: "inline-block"}}>
                                    <Link className="unstyled-link" to={`/poll/${this.props.pollId}/`}>Overview</Link>
                                    </div>
                                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center"}}>
                                    <Link className="unstyled-link" to={`/poll/${this.props.pollId}/results`}>Results</Link>
                                    </div>
                                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center"}}>
                                        <Link className="unstyled-link" to={`/poll/${this.props.pollId}/settings`}>Settings</Link>
                                    </div>
                                </div>
                            </div>
        )
    }
}

export default SideNav;