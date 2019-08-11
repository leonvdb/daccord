import React, { useState, useRef, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';
import { primary, mediumGray, primaryStrong, above } from '../../../style/utilities';
import { SmallHeading, SmallerLabel } from '../../../style/elements';

interface Props {
    isOpen: boolean
    setIsOpen: (setValue: boolean) => void;
    url: string;
    className?: string;
}

const InviteModal = ({ isOpen, setIsOpen, url, className }: Props) => {
    const [isCopied, setIsCopied] = useState(false)
    const [closedAndCopied, setClosedAndCopied] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const urlRef = useRef<HTMLInputElement>(null)
    const copyToClipboard = () => {
        if (urlRef && urlRef.current) {
            urlRef.current.select()
            document.execCommand('copy');
            setIsCopied(true);
        }
    }
    useEffect(() => {
        if (isCopied && !isOpen) {
            setClosedAndCopied(true)
        }
        if (closedAndCopied && isOpen) {
            setIsCopied(false)
            setClosedAndCopied(false)
        }
    })

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <StyledModalHeader toggle={toggle}>Invite Participants</StyledModalHeader>
            <ModalBody>
                <SmallHeading>Share this Link</SmallHeading>
                <InputArea >
                    <input value={url} ref={urlRef} />
                </InputArea>
                {document.queryCommandSupported('copy') &&
                    <CopyButton onClick={copyToClipboard} isCopied={isCopied}>{isCopied ? "Copied!" : "Copy"}</CopyButton>
                }
            </ModalBody>
        </Modal>
    )
}

const StyledModalHeader = styled(ModalHeader)`
background: ${primary};
color: white;
border-radius: 0;
.close{
    color: white;
}
`

const InputArea = styled.div`
max-width:100%;
`
const CopyButton = styled(SmallerLabel) <{ isCopied: boolean }>`
${above.custom(470)}{
 position: absolute;
    right: 2rem;
    top: 54.5%;
}
    margin-left: .2rem;
    color: ${({ isCopied }) => isCopied ? 'green' : primaryStrong};
    cursor: ${({ isCopied }) => isCopied ? 'auto' : 'pointer'};
`

export default styled(InviteModal)`
max-width: 600px;
${SmallHeading}{
    margin-top: .8rem;
    margin-bottom: 1rem;
}
input {
    width: 100%;
    height: 2.5rem;
    border-radius: 4px;
    border: 1px solid ${mediumGray};
    padding: .875rem;
    margin-bottom: 1rem;
    font-size: .8rem;
    ${above.sm}{
        font-size: 100%
    }
}
`;