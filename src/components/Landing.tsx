import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import Footer from './layout/Footer';
import { default as Nav } from './layout/Header';
import HeaderImage from '../images/header.svg'
import MobileHeaderImage from '../images/header-mobile.svg'
import styled from 'styled-components';
import { LargeBoldLabel, LargeParagraph, SecondaryButton, MediumLabel } from '../style/elements';
import { blackPurple, above, below } from '../style/utilities';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import Media from 'react-media';
import { Flex, Box } from '@rebass/grid';

function Landing(props: WithNamespaces) {
    return (
        <React.Fragment>
            <Media query={above.custom(870).replace('@media ', '')}>
                {matches => <BackgroundFragment src={matches ? HeaderImage : MobileHeaderImage} />}
            </Media>
            <Nav />
            <Header>
                <Flex justifyContent="center" alignItems="center">
                    <Box>
                        <LargeBoldLabel >Decisions that <br /> work for
                        <Media query={above.custom(870).replace('@media ', '')}>
                                {matches => !matches && <br />}
                            </Media>
                            everyone
                        </LargeBoldLabel>
                        <LargeParagraph>D’accord helps your group to find empowering and sustainable solutions </LargeParagraph>
                        <Link to="/create"><SecondaryButton> <MediumLabel>Get Started</MediumLabel></SecondaryButton></Link>
                    </Box>
                </Flex>
            </Header>
            <Media query={above.custom(870).replace('@media ', '')}>
                {matches => matches && <Slideshow />}
            </Media>
            <Footer />
        </React.Fragment>
    )
}

const BackgroundFragment = styled.img`  
position:absolute;
z-index:-10;
width: 100%;
height: 50rem;
`

const Header = styled.div`
text-align: left;
margin: 3.375rem 2.375rem 0 2.375rem;
color: white;
${below.custom(360)}{
    margin: 3.375rem 1.375rem 0 1.375rem;
}
${below.custom(871)}{
    ${LargeBoldLabel}{
    font-size: 2.5rem;
    }
    ${LargeParagraph}{
        font-size: .875rem;
    }
}
${above.custom(870)}{
    text-align: center;
    margin-top: 5.5rem;
}

${SecondaryButton}{
    margin:0;
    margin-top: 2.5rem;
    box-shadow: 0px 4px 4px rgba(102, 102, 102, 0.25);
    width: 100%;
    max-height: 3rem;
    ${above.custom(500)}{
        width: 18.75rem;
        max-height: none;
}
    ${above.custom(870)}{
        margin-top: 4rem;
        }
        ${MediumLabel}{
        margin:0;
        color: ${blackPurple};
    }
}
p{
    margin-top: 1.625rem;
}
h1{
    margin:0;
}
`

export default withNamespaces()(Landing);