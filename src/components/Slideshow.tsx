import React, { useState } from 'react'
import Overview from '../images/example/overview.png';
import ResultsList from '../images/example/results-list.png';
import ResultsTable from '../images/example/results-table.png';
import styled, { css } from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { SmallHeading } from '../style/elements';
import { darkishGray } from '../style/utilities';

interface IProps {
    className?: string
}

const Slideshow = (props: IProps) => {
    const [currentImage, setCurrentImage] = useState('overview')
    return (
        <div className={props.className}>
            <Flex>
                <Box width={3 / 4}>
                    <ImageContainer>
                        {
                            currentImage === 'results-list' ? (
                                <img src={ResultsList} />
                            ) : currentImage === 'results-table' ? (
                                <img src={ResultsTable} />
                            ) : (
                                        <img src={Overview} />
                                    )}
                    </ImageContainer>
                </Box>
                <Box width={1 / 4}>
                    <ImageNavigation>
                        <NavElement onClick={() => { // tslint:disable-next-line jsx-no-lambda
                            setCurrentImage("overview")
                        }} active={currentImage === 'overview'}>
                            <SmallHeading>
                                Organize and rate options
                        </SmallHeading>
                        </NavElement>
                        <NavElement onClick={() => { // tslint:disable-next-line jsx-no-lambda
                            setCurrentImage("results-list")
                        }} active={currentImage === 'results-list'}>
                            <SmallHeading>
                                Check the Results
                        </SmallHeading>
                        </NavElement>
                        <NavElement onClick={() => { // tslint:disable-next-line jsx-no-lambda
                            setCurrentImage("results-table")
                        }} active={currentImage === 'results-table'}>
                            <SmallHeading>
                                Learn about individual opinions
                        </SmallHeading>
                        </NavElement>
                    </ImageNavigation>
                </Box>
            </Flex>
        </div>
    )
}

const ImageNavigation = styled.div`

`

const NavElement = styled.div<{ active: boolean }>`
cursor: pointer;
height: 5rem;
width: 11.5rem;
border-radius: 4px;
margin-bottom: 1.5rem;
padding: 1rem;
padding-right:.6rem;
background-color: rgba(255, 255, 255, 0);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
transition: all ease-in-out .4s;
transition-property: color, background-color, box-shadow;
${SmallHeading}{
color: ${darkishGray};
margin: 0;
}
${({ active }) => active && css`
${SmallHeading}{
color: #000;
}
background-color: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`}
`

const ImageContainer = styled.div`
width: 800px;
height:420px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 3px;
overflow: hidden;
img{
    max-width:100%;
    height:auto;
}
`

export default styled(Slideshow)`
width: 70%;
margin: 24rem auto 10rem auto;
`;
