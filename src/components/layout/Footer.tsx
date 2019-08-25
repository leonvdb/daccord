import * as React from 'react'
import styled from 'styled-components';
import { above } from '../../style/utilities';
import { Flex, Box } from '@rebass/grid';
import Github from "../../images/github.svg";
import { SmallerLabel } from '../../style/elements';

function Footer() {
    return (
        <Bar>
            <Nav alignItems="center" flexWrap="wrap">
                <NavElement>
                    <a href="mailto:info@daccordapp.com">
                        <SmallerLabel>
                            Contact
                    </SmallerLabel>
                    </a>
                </NavElement>
                <NavElement>
                    <a href="https://github.com/leonvdb/daccord" target="_blank" >
                        <SmallerLabel>
                            Contribute
                    </SmallerLabel>
                    </a>
                </NavElement>
                <NavElement className="right" alignSelf="flex-end">
                    <a href="https://github.com/leonvdb/daccord" target="_blank" >
                        <img src={Github} />
                    </a>
                </NavElement>
            </Nav>
        </Bar>
    )
}

const Bar = styled.footer`
width: 100%;
position: absolute;
background-color: #8C78DE;
color: white;
top: 138rem;
${above.custom(870)}{
top: 178rem;
}
`
const Nav = styled(Flex)`
text-align: center;
height: 100%;
.right{
    margin-left: auto;
    margin-right: 2rem;
}
`

const NavElement = styled(Box)`
margin: .8rem 0 .8rem 2rem;
a{
    color: white;
}
${SmallerLabel}{
    color: white;
}
`

export default Footer;