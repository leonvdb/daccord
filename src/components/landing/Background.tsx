import React from 'react'
import Media from 'react-media';
import { above } from '../../style/utilities';
import HeaderImage from '../../images/header.svg'
import MobileHeaderImage from '../../images/header-mobile.svg'
import MobileFrame1 from "../../images/mobile-frame-1.svg"
import MobileFrame2 from "../../images/mobile-frame-2.svg"
import DesktopFrame1 from "../../images/desktop-frame-1.svg"
import DesktopFrame2 from "../../images/desktop-frame-2.svg"
import styled from 'styled-components';

const Background = () => {
    return (
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
    )
}

const BackgroundFragment = styled.img<{ height: number, top: number }>`  
position:absolute;
z-index:-10;
width: 100%;
top: ${({ top }) => `${top}rem`};
height: ${({ height }) => `${height}rem`};
`;

export default Background
