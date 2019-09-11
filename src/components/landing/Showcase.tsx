import React from 'react'
import styled from 'styled-components';
import { SmallBoldHeading } from '../../style/elements';
import Overview from "../../images/example/overview.png"
import ResultsList from "../../images/example/results-list.png"
import ResultsTable from "../../images/example/results-table.png"

const Showcase = () => {
    return (
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
    )
}


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

export default Showcase
