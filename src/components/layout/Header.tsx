import * as React from 'react'
import { Link } from 'react-router-dom';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';

interface Props extends WithNamespaces {

}

class Header extends React.Component<Props>{


    render() {

        const { t } = this.props

        return (
            <React.Fragment>
                <div style={{ height: "8vh" }} />
                <nav className="navbar navbar-expand-sm navbar-light bg-light" style={{ height: "8vh", position: "fixed", width: "100%", top: "0px", zIndex: 1 }}>
                    <div className="container">
                        <Link to="/" className="navbar-brand">WorkInProgress</Link>
                        <LanguageDropdown />
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <div>{t("Home")}</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">
                                    <div>{t("Create poll")}</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

const ComponentWithNamespaces = withNamespaces()(Header);
export default ComponentWithNamespaces;
