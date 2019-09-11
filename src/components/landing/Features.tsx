import React from 'react'
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { MediumLabel } from '../../style/elements';
import Empower from "../../images/empower.svg"
import Fair from "../../images/fair.svg"
import Idea from "../../images/idea.svg"
import { above } from '../../style/utilities';

interface IProps {
    className?: string
}

const Features = (props: IProps) => {
    const { className } = props;
    return (
        <div className={className}>
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
        </div>
    )
}

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

export default styled(Features)`
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
`
