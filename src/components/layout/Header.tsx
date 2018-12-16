import * as React from 'react'
import { Link } from 'react-router-dom';
import { NamespacesConsumer } from 'react-i18next';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import LanguageButton from './LanguageButton';

class Header extends React.Component {


    render() {

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">WorkInProgress</Link>
                    <UncontrolledDropdown className="mr-auto ml-3">
                        <DropdownToggle caret={true}>
                            Dropdown
                            </DropdownToggle>
                        <DropdownMenu>
                            <LanguageButton langName="English" langCode="en" />
                            <LanguageButton langName="Deutsch" langCode="de" />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">

                                <NamespacesConsumer>
                                    {
                                        t => <div>{t("navHome")}</div>
                                    }
                                </NamespacesConsumer>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">
                                <NamespacesConsumer>
                                    {
                                        t => <div>{t("navCreatePoll")}</div>
                                    }
                                </NamespacesConsumer>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;