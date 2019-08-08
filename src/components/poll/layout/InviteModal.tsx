import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface Props {
    isOpen: boolean
    setIsOpen: (setValue: boolean) => void;
}

const InviteModal = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Modal isOpen={isOpen} toggle={// tslint:disable-next-line jsx-no-lambda
            () => { setIsOpen(!isOpen) }}>
            <ModalHeader>Invite a new Participant</ModalHeader>
            <ModalBody>blub blub blub</ModalBody>
        </Modal>
    )
}

export default InviteModal;