import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import Footer from './layout/Footer';
import { default as Nav } from './layout/Header';
import HeaderImage from '../images/header.svg'
import styled from 'styled-components';
import { LargeBoldLabel, LargeParagraph, SecondaryButton, MediumLabel } from '../style/elements';
import { blackPurple } from '../style/utilities';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';

function Landing(props: WithNamespaces) {
    return (
        <React.Fragment>
            <BackgroundFragment src={HeaderImage} />
            <Nav />
            <Header>
                <LargeBoldLabel >Decisions that <br /> work for everyone</LargeBoldLabel>
                <LargeParagraph>D’accord helps your group to find empowering and sustainable solutions </LargeParagraph>
                <Link to="/create"><SecondaryButton> <MediumLabel>Get Started</MediumLabel></SecondaryButton></Link>
            </Header>
            <Slideshow />
            <Footer />
        </React.Fragment>
    )
}

const BackgroundFragment = styled.img`
position:absolute;
z-index:-10;
width: 100%;
`

const Header = styled.div`
text-align: center;
margin-top: 5.5rem;
color: white;

${SecondaryButton}{
    margin-top: 4rem;
    box-shadow: 0px 4px 4px rgba(102, 102, 102, 0.25);
    ${MediumLabel}{
    margin:0;
    color: ${blackPurple};
}
    width: 18.75rem;
}
p{
    margin-top: 1.625rem;
}
h1{
    margin:0;
}
`

export default withNamespaces()(Landing);