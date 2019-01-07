import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface Props {
    name: string
    description?: string
    modalOpen: boolean
    toggle: () => void
    isCreator: boolean
}

class OptionModal extends React.Component<Props> {

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
        const { name, description, toggle, isCreator } = this.props
        console.log({ isCreator })

        return (
            <div>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={toggle}>
                    <ModalHeader toggle={toggle}>{name}</ModalHeader>
                    <ModalBody>
                        <p style={{ wordWrap: 'break-word' }}>{description}</p>
                        {isCreator && <button className="btn btn-danger w-25">Delete</button>}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default OptionModal;