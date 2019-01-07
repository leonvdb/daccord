import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';

function Landing(props: WithNamespaces) {
    const { t } = props
    return (
        <div className="container mt-5">
            <div className="jumbotron text-center">
                <h1 className="display-4">{t("I am the landing page")}</h1>
            </div>
        </div>
    )
}

export default withNamespaces()(Landing);