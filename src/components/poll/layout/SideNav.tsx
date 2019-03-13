import * as React from 'react';

interface Props {
    handleMenuClick: (e: React.MouseEvent<HTMLElement>, tab: string) => void
}

class SideNav extends React.Component<Props> {
    render(){
        return (
            <div className="bg-secondary" style={{maxWidth: "inherit", width: "100%", height: "92vh", position: "fixed", bottom: "0px"}}>
                                <div>
                                    <div style={{ marginTop: "20rem", width: "100%", textAlign: "center", display: "inline-block"}}>
                                        <button onClick={// tslint:disable-next-line jsx-no-lambda
                                        (e) => {this.props.handleMenuClick(e, "OVERVIEW")} } 
                                        className="unstyled-button">
                                            Overview
                                        </button>
                                    </div>
                                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center"}}>
                                        <button onClick={// tslint:disable-next-line jsx-no-lambda
                                        (e) => {this.props.handleMenuClick(e, "RESULTS")} } 
                                        className="unstyled-button">
                                            Results
                                        </button>
                                    </div>
                                    <div style={{ marginTop: "3rem", width: "100%", textAlign: "center"}}>
                                        <button onClick={// tslint:disable-next-line jsx-no-lambda
                                        (e) => {this.props.handleMenuClick(e, "SETTINGS")} } 
                                        className="unstyled-button">
                                            Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
        )
    }
}

export default SideNav;