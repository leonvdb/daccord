import * as React from 'react'
import { Link } from 'react-router-dom';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import LanguageButton from './LanguageButton';
import { Store } from '../../reducers';
import { connect } from 'react-redux';

interface Language {
    name: string,
    code: string
}

interface Props extends PropsFromState, WithNamespaces {

}

class Header extends React.Component<Props>{


    render() {

        const languages: Language[] = [
            {
                name: "English",
                code: "en"
            },
            {
                name: "Deutsch",
                code: "de"
            }
        ]
        const { t } = this.props

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">WorkInProgress</Link>
                    <UncontrolledDropdown className="nav-item mr-auto ml-2">
                        <DropdownToggle className="text-secondary" nav={true} caret={true}>
                            {this.props.language}
                        </DropdownToggle>
                        <DropdownMenu>
                            {languages.map(language => {
                                if (language.name !== this.props.language) {
                                    return <LanguageButton langName={language.name} langCode={language.code} key={language.code} />
                                }
                            })}
                        </DropdownMenu>
                    </UncontrolledDropdown>
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
        )
    }
}

interface PropsFromState {
    language: string
}

const mapStateToProps = (state: Store) => ({
    language: state.language.languageLabel
})

const ComponentWithNamespaces = withNamespaces()(Header);
export default connect(mapStateToProps, null)(ComponentWithNamespaces);
