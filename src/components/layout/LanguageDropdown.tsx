import React from 'react'
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import LanguageButton from './LanguageButton';
import { Store } from '../../reducers';
import { connect } from 'react-redux';

const LanguageDropdown = (props: PropsFromState) => {
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

    return (
        <UncontrolledDropdown className="nav-item mr-auto ml-2">
            <DropdownToggle className="text-secondary" nav={true} caret={true}>
                {props.language}
            </DropdownToggle>
            <DropdownMenu>
                {languages.map(language => {
                    if (language.name !== props.language) {
                        return <LanguageButton langName={language.name} langCode={language.code} key={language.code} />
                    }
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

interface Language {
    name: string,
    code: string
}

interface PropsFromState {
    language: string
}

const mapStateToProps = (state: Store) => ({
    language: state.language.languageLabel
})

export default connect(mapStateToProps, null)(LanguageDropdown);
