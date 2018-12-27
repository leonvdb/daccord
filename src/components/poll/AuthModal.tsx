import * as React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Store } from '../../reducers';
import { IPoll, IUserState } from '../../interfaces';

interface Props extends PropsFromState {
    isOpen: boolean
    renderButton: boolean
}

class AuthModal extends React.Component<Props> {
    state = {
        isOpen: this.props.isOpen
    }

    constructor(props: Props) {
        super(props)
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { isOpen } = this.state
        const { poll, renderButton } = this.props

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                {renderButton && <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-outline-success">
                    <i className="fas fa-hand-peace mr-1" />Participate
                </button>}
                <Modal placement="right" isOpen={isOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Become a participant of {poll.title}
                    </ModalHeader>
                    <ModalBody />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    poll: state.poll.poll,
    user: state.user.user
});

interface PropsFromState {
    poll: IPoll
    user: IUserState
}

export default connect(mapStateToProps, null)(AuthModal);; 