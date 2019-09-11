import React from 'react'
import styled from 'styled-components';
import { above } from '../../style/utilities';
import { MediumHeading, SmallLightParagraph } from '../../style/elements';
import { Box, Flex } from '@rebass/grid';
import Bullet from "../../images/bullet.svg"

interface IProps {
    className?: string
}

const Basics = (props: IProps) => {
    return (
        <div className={props.className}>
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
        </div>
    )
}

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

export default styled(Basics)`
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
}`
