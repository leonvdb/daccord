import React from 'react'
import { LargeBoldLabel, LargeParagraph, SecondaryButton, MediumLabel } from '../../style/elements';
import Media from 'react-media';
import { above, below, blackPurple } from '../../style/utilities';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
    className?: string
}

const Header = (props: IProps) => {
    return (
        <div className={props.className}>
            <LargeBoldLabel >Decisions that <br /> work for
                        <Media query={above.custom(870).replace('@media ', '')}>
                    {matches => !matches && <br />}
                </Media>
                everyone
                        </LargeBoldLabel>
            <LargeParagraph>D’accord helps your group to find empowering and sustainable solutions </LargeParagraph>
            <Link to="/create"><SecondaryButton> <MediumLabel>Get Started</MediumLabel></SecondaryButton></Link>
        </div>
    )
}

export default styled(Header)`
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
`;
