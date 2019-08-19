import * as React from 'react'
import { Link } from 'react-router-dom';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import styled from 'styled-components';
import { SecondaryButton } from '../../style/elements';
import PlusPurple from '../../images/plus-purple.svg';

interface Props extends WithNamespaces {

}

class Header extends React.Component<Props>{


    render() {

        const { t } = this.props

        return (
            <React.Fragment>
                <StyledNav>
                    <LogoLink to="/">Logo</LogoLink>
                    <ContributeLink to="/contribute">
                        {t("Contribute")}
                    </ContributeLink>
                    <Link to="/create">
                        <SecondaryButton> Create Poll
                    <img src={PlusPurple} alt="Add Option" />
                        </SecondaryButton>
                    </Link>

                </StyledNav>
            </React.Fragment>
        )
    }
}

const LogoLink = styled(Link)`
color: white;
margin: 0 2.5rem;
`

const ContributeLink = styled(Link)`
color: white;
text-decoration: underline;
`

const StyledNav = styled.nav`
width: 100%;
height: 5.5rem;
padding-top: 1.6875rem;
z-index: 1;
${SecondaryButton}{
    box-shadow: 4px 8px 6.86391px rgba(74, 74, 74, 0.25);
    float:right;
    img{
        margin-left: .6875rem;
    }
}
`

const ComponentWithNamespaces = withNamespaces()(Header);
export default ComponentWithNamespaces;
