import * as React from 'react'
import { Link } from 'react-router-dom';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import styled from 'styled-components';
import { SecondaryButton } from '../../style/elements';
import PlusPurple from '../../images/plus-purple.svg';
import Media from 'react-media';
import { above } from '../../style/utilities';
import HeaderImage from '../../images/header.svg'
import MobileHeaderImage from '../../images/header-mobile.svg'
import Logo from '../../images/logo.svg'
import { Flex, Box } from '@rebass/grid';

interface Props extends WithNamespaces {

}

class Header extends React.Component<Props>{


    render() {

        const { t } = this.props

        return (
            <React.Fragment>
                <Media query={above.custom(870).replace('@media ', '')}>
                    {matches => <BackgroundFragment src={matches ? HeaderImage : MobileHeaderImage} height={50} top={0} />}
                </Media>
                <StyledNav>
                    <FlexContainer>
                        <Flex alignItems="flex-end">
                            <Box width="auto">
                                <LogoLink to="/"><img src={Logo} /></LogoLink>
                            </Box>

                            <Media query={above.custom(440).replace('@media ', '')}>
                                {matches => matches && <Box width="auto"><ContributeLink href="https://github.com/leonvdb/daccord" target="_blank">
                                    {t("Contribute")}
                                </ContributeLink>
                                </Box>}
                            </Media>
                        </Flex>
                    </FlexContainer>
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
margin: 0 1.2rem;
${above.custom(450)}{
    margin: 0 2.5rem;
}
img{
    height: 2rem;
}
`

const ContributeLink = styled.a`
color: white;
text-decoration: underline;
margin-top: 2.5rem;
`

const FlexContainer = styled.div`
display: inline-block;
`

const BackgroundFragment = styled.img<{ height: number, top: number }>`  
position:absolute;
z-index:-10;
width: 100%;
top: ${({ top }) => `${top}rem`};
height: ${({ height }) => `${height}rem`};
`;

const StyledNav = styled.nav`
width: 100%;
padding-top: 1.6875rem;
z-index: 1;
${SecondaryButton}{
    box-shadow: 4px 8px 6.86391px rgba(74, 74, 74, 0.25);
    float:right;
    margin-left: 0;
    img{
        margin-left: .6875rem;
    }
}
`

const ComponentWithNamespaces = withNamespaces()(Header);
export default ComponentWithNamespaces;
