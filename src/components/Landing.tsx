import * as React from 'react'
import { NamespacesConsumer } from 'react-i18next';

function Landing() {
    return (
        <div className="container mt-5">
            <div className="jumbotron text-center">
                <NamespacesConsumer>{translationFunction => <h1 className="display-4">{translationFunction("iAmLanding")}</h1>}</NamespacesConsumer>
            </div>
        </div>
    )
}

export default Landing;