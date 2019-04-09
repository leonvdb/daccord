import * as React from 'react'
import Header from './layout/Header';

function NotFound() {
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="jumbotron text-center mt-5">
                    <h1 className="display-4">404 Page Not Found</h1>
                    <hr />
                    <p className="lead">Oops...</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NotFound;