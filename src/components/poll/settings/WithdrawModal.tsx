import React, { useState } from 'react'
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import Modal from 'reactstrap/lib/Modal';
import { Mutation, withApollo, compose } from 'react-apollo';
import { DELETE_PARTICIPANT } from '../../../graphql/cudParticipant';
import { withRouter, RouteComponentProps } from 'react-router';
import { IPollQuery } from '../../../interfaces';
import DefaultClient from 'apollo-boost';

interface Props extends RouteComponentProps {
    poll: IPollQuery
    client: DefaultClient<any>
}

const WithdrawModal = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const toggle = () => { setModalOpen(!modalOpen) }
    return (
        <div data-testid="withdraw-modal">
            <button data-testid="withdraw-button" className="btn btn-secondary" onClick={toggle}>Withdraw from Poll</button>
            <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={toggle}>
                <ModalHeader toggle={toggle}>Withdraw from Poll</ModalHeader>
                <ModalBody>
                    <p className="lead d-block">Are you sure you want to permanently withdraw from this Poll?</p>
                    <button onClick={toggle} className="btn btn-outline-info w-25 mr-2">Cancel</button>
                    <Mutation
                        mutation={DELETE_PARTICIPANT}
                        update={// tslint:disable-next-line jsx-no-lambda
                            () => {
                                props.client.resetStore()
                                props.history.push('/withdrawn')
                            }
                        }
                    >
                        {(DELETE_PARTICIPANT) => (
                            <button onClick={// tslint:disable-next-line jsx-no-lambda
                                (e) => DELETE_PARTICIPANT({ variables: { pollId: props.poll.refId } })}
                                data-testid="confirm-withdraw-button"
                                className="btn btn-danger w-25">Withdraw</button>
                        )}
                    </Mutation>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default compose(withRouter, withApollo)(WithdrawModal);