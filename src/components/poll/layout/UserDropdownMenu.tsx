import React, { useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownToggle } from '../../../style/elements/Dropdown';
import ExpandButton from '../../../style/elements/Expand';
import styled from 'styled-components';
import { ButtonLabel } from '../../../style/elements';
import { smallParagraph } from '../../../style/utilities';
import SignOut from '../../../images/sign-out.svg';
import logOut from '../../../utilities/logOut';
import { RouteComponentProps, withRouter } from 'react-router';
import { IPollQuery } from '../../../interfaces';

interface Props extends RouteComponentProps<any> {
    pseudonym: string
    className?: string
    poll: IPollQuery
}

const UserDropdownMenu = (props: Props) => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowDropdownMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <div ref={ref} className={props.className}>
            <DropdownToggle
                onClick={ // tslint:disable-next-line jsx-no-lambda
                    () => { setShowDropdownMenu(!showDropdownMenu) }}>
                <ButtonLabel>
                    {props.pseudonym}
                </ButtonLabel>
                <ExpandButton clicked={showDropdownMenu} />
            </DropdownToggle>
            {showDropdownMenu && <DropdownMenu>
                <DropdownElement onClick={// tslint:disable-next-line jsx-no-lambda
                    () => {
                        logOut()
                        props.history.push(`/poll/${props.poll.refId}`)
                        window.location.reload();
                    }
                }>Sign Out</DropdownElement> <img src={SignOut} height="14px" />
            </DropdownMenu>}

        </div>
    )
}

const DropdownElement = styled.h5`
cursor: pointer;
margin: 0;
${smallParagraph}
display: inline-block;
`;

const styledUserDropdownMenu = styled(UserDropdownMenu)`
display: inline-block;
`


export default withRouter(styledUserDropdownMenu);