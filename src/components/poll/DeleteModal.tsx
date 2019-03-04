import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { compose, withApollo } from 'react-apollo';
import { IPollQuery } from 'src/interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import { DELETE_POLL } from '../../graphql/deletePoll'
import DefaultClient from 'apollo-boost';

interface Props extends RouteComponentProps {
    poll: IPollQuery
    client: DefaultClient<any>
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
                        <Mutation 
                        mutation={DELETE_POLL}
                        update={// tslint:disable-next-line jsx-no-lambda
                            () => {
                                this.props.client.resetStore()
                                this.props.history.push('/deleted')
                            }
                        }
                        >
                        {(DELETE_POLL) => (
                            <button onClick={// tslint:disable-next-line jsx-no-lambda
                                (e) => DELETE_POLL({variables: {pollId: this.props.poll.refId}})} 
                            className="btn btn-danger w-25">Delete</button>
                        )}
                        </Mutation>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default compose(withRouter, withApollo)(DeleteModal);