import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { default as Nav } from '../layout/Header';
import styled from 'styled-components';
import { above, below } from '../../style/utilities';
import Slideshow from '../Slideshow';
import Media from 'react-media';
import Footer from '../layout/Footer';
import Features from './Features';
import Showcase from './Showcase';
import Basics from './Basics';
import Infolinks from './Infolinks';
import Header from './Header';
import Background from './Background';

function Landing(props: WithNamespaces) {
    return (
        <React.Fragment>
            <Background />
            <Nav />
            <Body>
                <Header />
                <Media query={above.custom(870).replace('@media ', '')}>
                    {matches => matches ? (
                        <React.Fragment>
                            <Slideshow />
                            <Features />
                        </React.Fragment>
                    ) : (
                            <Showcase />
                        )
                    }
                </Media>
                <Basics />
                <Infolinks />
            </Body>
            <Footer />
        </React.Fragment>
    )
}

const Body = styled.div`
margin: 3.375rem 2.375rem 0 2.375rem;
${below.custom(360)}{
    margin: 3.375rem 1.375rem 0 1.375rem;
}
`

export default withNamespaces()(Landing);