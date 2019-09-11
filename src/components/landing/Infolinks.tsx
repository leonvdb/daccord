import React from 'react'
import { Flex, Box } from '@rebass/grid';
import { MediumLabel } from '../../style/elements';
import styled from 'styled-components';
import { above } from '../../style/utilities';

interface IProps {
    className?: string
}

const Infolinks = (props: IProps) => {
    return (
        <Flex className={props.className} flexWrap="wrap" justifyContent="space-between">
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
        </Flex>
    )
}

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

export default styled(Infolinks)`
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
`
