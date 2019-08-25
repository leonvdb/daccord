import * as React from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { default as Nav } from './layout/Header';
import HeaderImage from '../images/header.svg'
import MobileHeaderImage from '../images/header-mobile.svg'
import styled from 'styled-components';
import { LargeBoldLabel, LargeParagraph, SecondaryButton, MediumLabel, SmallBoldHeading, MediumHeading, SmallLightParagraph } from '../style/elements';
import { blackPurple, above, below } from '../style/utilities';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import Media from 'react-media';
import Overview from "../images/example/overview.png"
import ResultsList from "../images/example/results-list.png"
import ResultsTable from "../images/example/results-table.png"
import MobileFrame1 from "../images/mobile-frame-1.svg"
import MobileFrame2 from "../images/mobile-frame-2.svg"
import DesktopFrame1 from "../images/desktop-frame-1.svg"
import DesktopFrame2 from "../images/desktop-frame-2.svg"
import Empower from "../images/empower.svg"
import Fair from "../images/fair.svg"
import Idea from "../images/idea.svg"
import Bullet from "../images/bullet.svg"
import { Flex, Box } from '@rebass/grid';
import Footer from './layout/Footer';

function Landing(props: WithNamespaces) {
    return (
        <React.Fragment>
            <Media query={above.custom(870).replace('@media ', '')}>
                {matches => <React.Fragment>
                    <BackgroundFragment src={matches ? HeaderImage : MobileHeaderImage} height={50} top={0} />
                    {matches ? (
                        <React.Fragment>
                            <BackgroundFragment src={DesktopFrame1} height={30} top={87} />
                            <BackgroundFragment src={DesktopFrame2} height={20} top={158} />
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <BackgroundFragment src={MobileFrame1} height={20} top={70} />
                                <BackgroundFragment src={MobileFrame2} height={27} top={112} />
                            </React.Fragment>
                        )}
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
                    {matches => matches ? (
                        <React.Fragment>
                            <Slideshow />
                            <Features>
                                <Flex alignSelf="center" justifyContent="space-between">
                                    <FeatureElement>
                                        <Flex>
                                            <Box width={2 / 11}>
                                                <img src={Empower} />
                                            </Box>
                                            <Box width={9 / 11}>
                                                <MediumLabel>
                                                    Empowering
                                        </MediumLabel>
                                                <p>Gives all opinions the opportunity to be expressed. Positive or negative sentiments towards any option.</p>
                                            </Box>
                                        </Flex>
                                    </FeatureElement>
                                    <FeatureElement>
                                        <Flex>
                                            <Box width={2 / 11}>
                                                <img src={Fair} />
                                            </Box>
                                            <Box width={9 / 11}>
                                                <MediumLabel>
                                                    Conflict free and fair
                                        </MediumLabel>
                                                <p>The solution with the highest consensus succeeds.
Participants generally feel more fairly represented than in a conventional voting process.</p>
                                            </Box>
                                        </Flex>
                                    </FeatureElement>
                                    <FeatureElement>
                                        <Flex>
                                            <Box width={2 / 11}>
                                                <img src={Idea} />
                                            </Box>
                                            <Box width={9 / 11}>
                                                <MediumLabel>
                                                    Creative and sustainable
                                        </MediumLabel>
                                                <p>Challenges participants to come up with solutions that have everyones interest at heart, as these have the biggest chance of success.</p>
                                            </Box>
                                        </Flex>
                                    </FeatureElement>
                                </Flex>
                            </Features>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <div>
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
                                </div>
                            </React.Fragment>
                        )
                    }
                </Media>
                <Basics>
                    <MediumHeading>
                        The Basics
                    </MediumHeading>
                    <BasicsElement alignSelf="center" justifyContent="center">
                        <Box width={[1 / 12, 1 / 20]}>
                            <img src={Bullet} />
                        </Box>
                        <Box width={[11 / 12, 19 / 20]}>
                            <SmallLightParagraph>
                                When voting, you indicate your opposition - 0 means “I have nothing against this”, 10 means “I strongly oppose this”
                    </SmallLightParagraph>
                        </Box>
                    </BasicsElement>
                    <BasicsElement alignSelf="center" justifyContent="center">
                        <Box width={[1 / 12, 1 / 20]}>
                            <img src={Bullet} />
                        </Box>
                        <Box width={[11 / 12, 19 / 20]}>
                            <SmallLightParagraph>
                                You rate all of the available options rather than just voting for one.
                    </SmallLightParagraph>
                        </Box>
                    </BasicsElement>
                    <BasicsElement alignSelf="center" justifyContent="center">
                        <Box width={[1 / 12, 1 / 20]}>
                            <img src={Bullet} />
                        </Box>
                        <Box width={[11 / 12, 19 / 20]}>
                            <SmallLightParagraph>
                                The solution that receives the lowest amount of resistance in the group is the one with the highest consensus
                    </SmallLightParagraph>
                        </Box>
                    </BasicsElement>
                </Basics>
                <InfoLinks flexWrap="wrap" justifyContent="space-between">
                    <Box width={[1, 1, 2 / 5, 3 / 7]}>
                        <a href="https://youtu.be/3wR5YXYECOE" target="_blank">
                            <InfoButton>
                                <MediumLabel>
                                    Watch an explanation video
                        </MediumLabel>
                            </InfoButton>
                        </a>
                    </Box>
                    <Box width={[1, 1, 2 / 5, 3 / 7]}>
                        <a href="http://www.sk-prinzip.eu/" target="_blank">
                            <InfoButton>
                                <MediumLabel>
                                    Learn More about the idea
                        </MediumLabel>
                            </InfoButton>
                        </a>
                    </Box>
                </InfoLinks>
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

const Body = styled.div`
margin: 3.375rem 2.375rem 0 2.375rem;
${below.custom(360)}{
    margin: 3.375rem 1.375rem 0 1.375rem;
}
`
const Features = styled.div`
position:absolute;
margin: 0 auto;
left: 0;
right: 0;
top: 100rem;
width: 90%;
max-width: 1350px;
${above.custom(1450)}{
    width: 75%;
}
`;

const FeatureElement = styled(Box)`
color: white;
max-width: 21rem;
img{
    height: 2.5rem;
}
${MediumLabel}{
    color: white;
    margin-top: 1rem;
}
p{
    font-size: .8125rem;
}
`

const Basics = styled.div`
width: 80%;
position:absolute;
top: 93rem;
max-width: 950px;

${above.custom(870)}{
    top: 124rem;
    width: 60%;
    margin: 0 auto;
    left: 0;
    right: 0;
    ${MediumHeading}{
        text-align: center;
        margin-bottom:4rem;
    }
}
`

const BasicsElement = styled(Flex)`
margin-top: .5rem;
${above.custom(870)}{
    margin-top: 2rem;
    }
${SmallLightParagraph}{
    margin-top: .2rem;
    ${above.custom(870)}{
    font-size: 1.5rem;
    margin-top: 0;
    }
}
`

const InfoLinks = styled(Flex)`
position:absolute;
top: 120rem;;
margin: 0 auto;
left: 0;
right: 0;
width: 80%;
max-width: 1080px;
${above.custom(870)}{
top: 168rem;
}
`;

const InfoButton = styled.button`
width:100%;
height: 4.6875rem;
background:none;
border: 3px solid white;
margin-bottom: 2rem;
${MediumLabel}{
    margin: 0;
    color: white;
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