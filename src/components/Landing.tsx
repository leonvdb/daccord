import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import Footer from './layout/Footer';
import { default as Nav } from './layout/Header';
import HeaderImage from '../images/header.svg'
import MobileHeaderImage from '../images/header-mobile.svg'
import styled from 'styled-components';
import { LargeBoldLabel, LargeParagraph, SecondaryButton, MediumLabel, SmallBoldHeading } from '../style/elements';
import { blackPurple, above, below } from '../style/utilities';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import Media from 'react-media';
import Overview from "../images/example/overview.png"
import ResultsList from "../images/example/results-list.png"
import ResultsTable from "../images/example/results-table.png"
import MobileFrame1 from "../images/mobile-frame-1.svg"

function Landing(props: WithNamespaces) {
    return (
        <React.Fragment>
            <Media query={above.custom(870).replace('@media ', '')}>
                {matches => <React.Fragment>
                    <BackgroundFragment src={matches ? HeaderImage : MobileHeaderImage} height={50} top={0} />
                    {!matches && <BackgroundFragment src={MobileFrame1} height={20} top={70} />}
                </React.Fragment>
                }
            </Media>
            <Nav />
            <Body>
                <Header>
                    <LargeBoldLabel >Decisions that <br /> work for
                        <Media query={above.custom(870).replace('@media ', '')}>
                            {matches => !matches && <br />}
                        </Media>
                        everyone
                        </LargeBoldLabel>
                    <LargeParagraph>D’accord helps your group to find empowering and sustainable solutions </LargeParagraph>
                    <Link to="/create"><SecondaryButton> <MediumLabel>Get Started</MediumLabel></SecondaryButton></Link>
                </Header>
                <Media query={above.custom(870).replace('@media ', '')}>
                    {matches => matches ? <Slideshow /> : <React.Fragment>
                        <Showcase>
                            <ShowcaseElement color="white" top={33}>
                                <SmallBoldHeading>
                                    Organize and rate options
                        </SmallBoldHeading>
                                <img src={Overview} />
                            </ShowcaseElement>
                            <ShowcaseElement color="black" top={53}>
                                <SmallBoldHeading>
                                    Check the results
                        </SmallBoldHeading>
                                <img src={ResultsList} />
                            </ShowcaseElement>
                            <ShowcaseElement color="white" top={73}>
                                <SmallBoldHeading>
                                    Learn about individual opinions
                        </SmallBoldHeading>
                                <img src={ResultsTable} />
                            </ShowcaseElement>
                        </Showcase>
                    </React.Fragment>
                    }
                </Media>
            </Body>
            <Footer />
        </React.Fragment>
    )
}

const BackgroundFragment = styled.img<{ height: number, top: number }>`  
position:absolute;
z-index:-10;
width: 100%;
top: ${({ top }) => `${top}rem`};
height: ${({ height }) => `${height}rem`};
`

const Showcase = styled.div`
`
const Body = styled.div`
margin: 3.375rem 2.375rem 0 2.375rem;
${below.custom(360)}{
    margin: 3.375rem 1.375rem 0 1.375rem;
}
`

const ShowcaseElement = styled.div<{ color: string, top: number }>`
    position:absolute;
    top: ${({ top }) => `${top}rem`};
    color: ${({ color }) => color};
img{
    width: 100%;
    max-width:330px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 3px;
}
`

const Header = styled.div`
text-align: left;
color: white;
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