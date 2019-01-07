import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface Props {
    name: string
    description?: string
    modalOpen: boolean
    toggle: () => void
}

class OptionReadModal extends React.Component<Props> {

    state = {
        modalOpen: false
    }
    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            modalOpen: nextProps.modalOpen
        })
    }

    render() {
        const { modalOpen } = this.state
        const { name, description, toggle } = this.props

        return (
            <div>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={toggle}>
                    <ModalHeader toggle={toggle}>{name}</ModalHeader>
                    <ModalBody>
                        <p style={{ wordWrap: 'break-word' }}>{description}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default OptionReadModal;