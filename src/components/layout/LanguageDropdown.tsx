import React, { useState, useEffect, useRef } from 'react'
import LanguageButton from './LanguageButton';
import { Store } from '../../reducers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ExpandButton from '../../style/elements/Expand';

const LanguageDropdown = (props: PropsFromState) => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
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

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowDropdownMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <div ref={ref}>
            <DropdownToggle onClick={ // tslint:disable-next-line jsx-no-lambda
                () => { setShowDropdownMenu(!showDropdownMenu) }}>
                {props.language}
                <ExpandButton clicked={showDropdownMenu} />
            </DropdownToggle>
            {showDropdownMenu && <DropdownMenu>
                {languages.map(language => {
                    if (language.name !== props.language) {
                        return <LanguageButton langName={language.name} langCode={language.code} key={language.code} />
                    }
                })}
            </DropdownMenu>}
        </div>
    )
}


const DropdownMenu = styled.div`
position: absolute;
box-shadow: 0px 1.69167px 6.76667px rgba(4, 4, 4, 0.25);
padding: .5rem;
border-radius: 4px;
`
const DropdownToggle = styled.div`
margin-bottom: .4rem;
img{
    margin-left: .4rem;
}
`

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

const styledLanguageDropdown = styled(LanguageDropdown)`
color: black;
`

export default connect(mapStateToProps, null)(styledLanguageDropdown);
