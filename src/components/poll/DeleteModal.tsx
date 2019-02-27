import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { deletePoll } from '../../actions/pollActions';
import { IPollQuery } from 'src/interfaces';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends PropsFromDispatch, RouteComponentProps {
    poll: IPollQuery
}

class DeleteModal extends React.Component<Props> {
    state = {
        modalOpen: false
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    deletePoll = () => {
        this.props.deletePoll(this.props.poll.refId)
        this.props.history.push('/deleted')
    }

    render() {
        const { modalOpen } = this.state

        return (
            <div>
                <i id="Modal" onClick={this.toggle} className="fas fa-trash-alt float-right" style={{ cursor: 'pointer' }} />
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Poll</ModalHeader>
                    <ModalBody>
                        <p className="lead d-block">Are you sure you want to delete this Poll?</p>
                        <button onClick={this.toggle} className="btn btn-outline-info w-25 mr-2">Cancel</button>
                        <button onClick={this.deletePoll} className="btn btn-danger w-25">Delete</button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


interface PropsFromDispatch {
    deletePoll: (pollId: string) => void
}



export default connect(null, { deletePoll })(withRouter(DeleteModal));