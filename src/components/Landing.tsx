import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import Footer from './layout/Footer';
import Header from './layout/Header';

function Landing(props: WithNamespaces) {
    const { t } = props
    return (
        <React.Fragment>
            <Header />
            <div className="container mt-5">
                <div className="jumbotron text-center">
                    <h1 className="display-4">{t("I am the landing page")}</h1>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default withNamespaces()(Landing);